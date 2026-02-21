import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from '@/lib/db';
import PYQ from '@/models/PYQ';
import AICache from '@/models/AICache';
import mongoose from 'mongoose';
import crypto from 'crypto';

function parseRetryAfter(msg: string): number {
    const match = msg.match(/retry[^0-9]*(\d+\.?\d*)s/i);
    return match ? Math.ceil(parseFloat(match[1])) : 60;
}
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function POST(req: Request) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    try {
        const { message, subjectId, history } = await req.json();
        console.log(`AI Guru: Received request for message: "${message.substring(0, 20)}..." | Subject: ${subjectId}`);

        const db = await dbConnect();
        if (!db) {
            return NextResponse.json({ error: "Database connection unavailable" }, { status: 503 });
        }

        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            console.error(`AI Guru: Invalid subjectId: ${subjectId}`);
            return NextResponse.json({ error: "Invalid subject ID" }, { status: 400 });
        }

        // Cache Lookup
        const queryHash = crypto.createHash('md5').update(message.trim().toLowerCase()).digest('hex');
        const cachedResponse = await AICache.findOne({ subjectId: new mongoose.Types.ObjectId(subjectId), queryHash });

        if (cachedResponse) {
            console.log(`AI Guru: Cache hit for query: "${message.substring(0, 20)}..."`);
            return NextResponse.json({ text: cachedResponse.response, isCached: true });
        }

        const pyqs = await PYQ.find({ subjectId: new mongoose.Types.ObjectId(subjectId) }).lean();
        console.log(`AI Guru: Found ${pyqs.length} PYQs for context.`);

        const pyqContext = pyqs.map((p: any) => ({
            year: p.year,
            questions: p.extractedContent?.questions || [p.questionText]
        }));

        const systemInstruction = `
        You are "AI Guru", a helpful academic assistant for engineering students at UEM.
        Your goal is to help students solve Previous Year Questions (PYQs) and explain complex concepts.
        
        Context Data (PYQs for this subject):
        ${JSON.stringify(pyqContext, null, 2)}
        
        Instructions:
        1. If the student asks about a specific paper or question from the context, provide a detailed and accurate step-by-step solution.
        2. Keep your tone encouraging and academic. Use placeholders like [Step 1], [Step 2] for clarity.
        3. Use Markdown for formatting (bolding, lists, code blocks, etc.).
        4. If a question is not directly in the context, use your general knowledge but mention it's not in the previous papers.
        5. ALWAYS be helpful and concise.
        `;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            systemInstruction: systemInstruction
        });

        const chat = model.startChat({
            history: history || [],
            generationConfig: { maxOutputTokens: 1000 },
        });

        // Try with one auto-retry on 429
        let text = '';
        for (let attempt = 0; attempt <= 1; attempt++) {
            try {
                const result = await chat.sendMessage(message);
                text = (await result.response).text();
                break;
            } catch (err: any) {
                const errMsg: string = err?.message || '';
                const is429 = errMsg.includes('429') || errMsg.includes('Too Many Requests') || errMsg.includes('RESOURCE_EXHAUSTED');
                if (is429 && attempt === 0) {
                    const waitSec = parseRetryAfter(errMsg);
                    console.log(`[AI Guru] Rate limited. Waiting ${waitSec}s before retry…`);
                    await sleep(waitSec * 1000);
                    continue;
                }
                if (is429) {
                    const retryAfter = parseRetryAfter(errMsg);
                    return NextResponse.json({ error: 'RATE_LIMITED', retryAfter }, { status: 429 });
                }
                throw err;
            }
        }

        if (text) {
            // Save to Cache
            try {
                await AICache.create({
                    subjectId: new mongoose.Types.ObjectId(subjectId),
                    queryHash,
                    query: message,
                    response: text
                });
            } catch (cacheErr) {
                console.error("AI Guru: Cache save error:", cacheErr);
            }
        }

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("AI Guru API Error:", error);
        return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
    }
}
