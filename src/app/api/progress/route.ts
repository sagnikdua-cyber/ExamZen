import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Subject from "@/models/Subject";
import PYQ from "@/models/PYQ";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const userId = (session.user as any).id;
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Check for Exam Cycle Reset (30 days)
        const currentDate = new Date();
        const lastReset = user.lastResetDate ? new Date(user.lastResetDate) : new Date(user.createdAt || currentDate);
        const diffTime = currentDate.getTime() - lastReset.getTime();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        let wasReset = false;

        if (diffTime >= thirtyDaysInMs) {
            // Reset Progress
            user.progress = {
                solvedPYQs: [],
                aiQuestionsCount: 0,
                vivaUsage: [],
                viewedFlashcards: [],
                subjectScores: []
            };
            user.lastResetDate = currentDate;
            await user.save();
            wasReset = true;
        }


        // Calculation logic
        // 1. PYQ Progress (30%)
        const totalImportantPYQs = await PYQ.countDocuments({ isImportant: true });
        const solvedPYQsCount = user.progress?.solvedPYQs?.length || 0;
        const pyqScore = totalImportantPYQs > 0 ? (solvedPYQsCount / totalImportantPYQs) * 30 : 0;

        // 2. AI Guru (25%) - target 50 messages for 100% of this segment
        const aiCount = user.progress?.aiQuestionsCount || 0;
        const aiScore = Math.min((aiCount / 50) * 25, 25);

        // 3. Viva Usage (25%)
        const totalSubjects = 6;
        const subjectsUsed = user.progress?.vivaUsage?.length || 0;
        const vivaScore = (subjectsUsed / totalSubjects) * 25;

        // 4. Flashcards (20%) - target 100 cards
        const flashcardsViewed = user.progress?.viewedFlashcards?.length || 0;
        const flashcardScore = Math.min((flashcardsViewed / 100) * 20, 20);

        const totalReadiness = Math.round(pyqScore + aiScore + vivaScore + flashcardScore);

        // Weak Subjects logic (based on vivaUsage and subjectScores)
        // For now, let's just pick subjects with 0 usage
        const allSubjects = await Subject.find({ semester: user.year * 2 - 1 }); // Assuming 1st year = sem 1/2
        const usedSubjectSlugs = user.progress?.vivaUsage?.map((v: any) => v.subjectSlug) || [];
        const weakSubjects = allSubjects
            .filter(s => !usedSubjectSlugs.includes(s.code.toLowerCase()))
            .map(s => s.name)
            .slice(0, 3);

        const suggestions = [];
        if (pyqScore < 15) suggestions.push("Solve more previous year questions to understand exam patterns.");
        if (aiScore < 10) suggestions.push("Ask AI Guru to clarify complex topics.");
        if (vivaScore < 10) suggestions.push("Prepare for practicals using the Viva Prep tool.");
        if (flashcardScore < 10) suggestions.push("Use flashcards for quick revision of formulas.");

        return NextResponse.json({
            readiness: totalReadiness,
            weakSubjects,
            suggestions: suggestions.length > 0 ? suggestions : ["Keep up the great work! You're on track."],
            stats: {
                pyqs: solvedPYQsCount,
                ai: aiCount,
                viva: subjectsUsed,
                flashcards: flashcardsViewed
            },
            wasReset
        });
    } catch (error: any) {
        console.error("Progress API GET error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { type, id, metadata } = await req.json();
        await dbConnect();
        const userId = (session.user as any).id;

        let update = {};

        switch (type) {
            case "PYQ_SOLVED":
                update = { $addToSet: { "progress.solvedPYQs": id } };
                break;
            case "AI_INTERACTION":
                update = { $inc: { "progress.aiQuestionsCount": 1 } };
                break;
            case "VIVA_USAGE":
                //metadata.subjectSlug
                const user = await User.findById(userId);
                const existingVivaIdx = user.progress?.vivaUsage?.findIndex((v: any) => v.subjectSlug === metadata.subjectSlug);

                if (existingVivaIdx > -1) {
                    const field = `progress.vivaUsage.${existingVivaIdx}.count`;
                    const dateField = `progress.vivaUsage.${existingVivaIdx}.lastAccessed`;
                    update = { $inc: { [field]: 1 }, $set: { [dateField]: new Date() } };
                } else {
                    update = { $push: { "progress.vivaUsage": { subjectSlug: metadata.subjectSlug, count: 1, lastAccessed: new Date() } } };
                }
                break;
            case "FLASHCARD_VIEW":
                update = { $addToSet: { "progress.viewedFlashcards": id } };
                break;
            default:
                return NextResponse.json({ message: "Invalid type" }, { status: 400 });
        }

        await User.findByIdAndUpdate(userId, update);

        return NextResponse.json({ message: "Progress updated" });
    } catch (error: any) {
        console.error("Progress API POST error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
