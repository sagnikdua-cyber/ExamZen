import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/db";
import ESPNote from "@/models/ESPNote";

export async function POST(req: Request) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
    }

    try {
        const { subject, chapter, notes } = await req.json();

        if (!subject || !chapter || !notes) {
            return NextResponse.json({ error: "subject, chapter, and notes are required" }, { status: 400 });
        }

        const db = await dbConnect();
        if (!db) {
            return NextResponse.json({ error: "Database connection unavailable" }, { status: 503 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are an expert exam preparation assistant for engineering students studying "${subject}" (ESP - Essential Studies for Professionals).

The student has provided the following study notes for Chapter: "${chapter}":

---
${notes}
---

Based on these notes, generate the following:

1. **Expected Questions** (5-8 questions that are likely to appear in the exam):
   - Mix of short answer (2-3 marks) and descriptive (5-10 marks) questions
   - Include difficulty level for each

2. **Model Answers** for each question:
   - Clear, concise, and exam-ready answers
   - Include key points that would score full marks

3. **Flashcards** (8-12 cards for quick revision):
   - Front: A concept, term, or question
   - Back: The answer or explanation

Output exactly in this JSON format:
{
    "questions": [
        { "question": "...", "answer": "...", "marks": 5, "difficulty": "Medium" }
    ],
    "flashcards": [
        { "front": "...", "back": "..." }
    ]
}
`;

        console.log(`Generating ESP content for: ${subject} - ${chapter}...`);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("No JSON found in Gemini response for ESP");
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
        }

        const generated = JSON.parse(jsonMatch[0]);

        // Save to database
        const existingNote = await ESPNote.findOne({ subject, chapter });
        if (existingNote) {
            existingNote.content = notes;
            existingNote.generatedQuestions = generated.questions;
            existingNote.generatedFlashcards = generated.flashcards;
            await existingNote.save();
        } else {
            await ESPNote.create({
                subject,
                chapter,
                content: notes,
                generatedQuestions: generated.questions,
                generatedFlashcards: generated.flashcards
            });
        }

        return NextResponse.json(generated);
    } catch (error: any) {
        console.error("ESP Generate Error:", error.message);
        return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
    }
}

// GET: Retrieve saved notes & generated content for a subject
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");

    if (!subject) {
        return NextResponse.json({ error: "subject query param required" }, { status: 400 });
    }

    const db = await dbConnect();
    if (!db) {
        return NextResponse.json({ error: "Database connection unavailable" }, { status: 503 });
    }

    try {
        const notes = await ESPNote.find({ subject }).sort({ createdAt: -1 });
        return NextResponse.json(notes);
    } catch (error) {
        console.error("ESP Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}
