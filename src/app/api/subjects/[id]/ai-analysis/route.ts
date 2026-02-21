import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subject from "@/models/Subject";
import PYQ from "@/models/PYQ";
import SubjectInsight from "@/models/SubjectInsight";
import { analyzeSubjectPYQs } from "@/lib/gemini";

function normalizeProbableQuestions(questions: any[]): any[] {
    if (!questions || !Array.isArray(questions) || questions.length === 0) return [];

    // If it's already in the grouped format, keep it but filter out any invalid questions
    if (questions[0]?.chapter && Array.isArray(questions[0]?.questions)) {
        return questions.map(chapter => ({
            ...chapter,
            questions: (chapter.questions || [])
                .map((q: any) => {
                    if (typeof q === 'string') return { question: q, marks: 5, reasoning: "Derived from past topics.", repetitionLikelihood: "High" };
                    if (q && q.question) return q;
                    return null;
                })
                .filter((q: any) => q !== null && q.question && q.question.trim().length > 5)
        })).filter(c => c.questions.length > 0);
    }

    // If it's a flat list, migrate it to the "General" chapter
    const migrated = questions.map((q: any) => {
        if (typeof q === 'string' && q.trim().length > 5) {
            return { question: q, marks: 5, reasoning: "Derived from past year trends.", repetitionLikelihood: "High" };
        }
        if (q && typeof q === 'object' && q.question && q.question.trim().length > 5) {
            return {
                question: q.question,
                marks: q.marks || 5,
                reasoning: q.reasoning || "Derived from past topics.",
                repetitionLikelihood: q.repetitionLikelihood || "High"
            };
        }
        return null;
    }).filter(q => q !== null);

    return migrated.length > 0 ? [{ chapter: "General / Predicted", questions: migrated }] : [];
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await dbConnect();
    try {
        const insight = await SubjectInsight.findOne({ subjectId: id });
        if (!insight) return NextResponse.json({ message: "No analysis found" }, { status: 404 });

        const insightObj = insight.toObject();
        insightObj.probableQuestions = normalizeProbableQuestions(insightObj.probableQuestions);

        return NextResponse.json(insightObj);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await dbConnect();

    try {
        const { syllabus } = await req.json();
        const subject = await Subject.findById(id);
        if (!subject) return NextResponse.json({ error: "Subject not found" }, { status: 404 });

        const pyqs = await PYQ.find({ subjectId: id });

        // Trigger Gemini Analysis
        const analysis = await analyzeSubjectPYQs(subject.name, pyqs, syllabus);

        if (!analysis) {
            console.error(`AI Analysis failed for subject: ${subject.name}`);
            return NextResponse.json({ error: "AI Analysis failed to generate content." }, { status: 500 });
        }

        console.log(`AI Analysis successful for ${subject.name}. Normalizing probableQuestions...`);
        // Normalize data before saving to ensure it matches schema
        const normalizedAnalysis = {
            ...analysis,
            probableQuestions: normalizeProbableQuestions(analysis.probableQuestions)
        };

        // Save or update insight
        const insight = await SubjectInsight.findOneAndUpdate(
            { subjectId: id },
            {
                ...normalizedAnalysis,
                subjectId: id,
                lastAnalyzed: new Date()
            },
            { upsert: true, new: true }
        );

        return NextResponse.json(insight);
    } catch (error: any) {
        // Handle rate limit thrown by analyzeSubjectPYQs
        if (error?.message === "RATE_LIMITED") {
            return NextResponse.json(
                { error: "RATE_LIMITED", retryAfter: error.retryAfter ?? 60 },
                { status: 429 }
            );
        }
        console.error("AI Analysis Error:", {
            message: error.message,
            stack: error.stack,
            subjectId: id
        });
        return NextResponse.json({
            error: "Internal server error occurred during AI analysis.",
            details: error.message
        }, { status: 500 });
    }
}
