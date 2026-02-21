import { GoogleGenerativeAI } from "@google/generative-ai";

function parseRetryAfter(msg: string): number {
    const match = msg.match(/retry[^0-9]*(\d+\.?\d*)s/i);
    return match ? Math.ceil(parseFloat(match[1])) : 60;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function analyzeSubjectPYQs(subjectName: string, pyqs: any[], syllabus?: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not defined in .env.local");
        return null;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
    As an expert academic analyzer for engineering students at UEM, analyze the following syllabus and Previous Year Questions (PYQs) for the subject: "${subjectName}".
    
    ${syllabus ? `Syllabus/Chapters provided:\n${syllabus}\n` : ''}
    
    PYQ Data (use this to identify core topics and trends):
    ${JSON.stringify(pyqs, null, 2)}
    
    Your task:
    1. Identify Most Important Chapters (top 3) based on PYQ frequency.
    2. Identify Least Important Chapters based on PYQ frequency.
    3. Generate COMPREHENSIVE Flashcards. 
       - For each major chapter/module in the syllabus, generate 10-15 cards.
       - Each card MUST contain:
         - A clear title/concept name.
         - A precise definition.
         - THE FULL MATHEMATICAL FORMULA (if applicable, using standard notation).
         - At least 3-5 critical "Important Points" related to that concept.
    4. Predict COMPREHENSIVE probable questions grouped by chapter.
       - For each major chapter, predict 3-5 high-yield questions.
       - These MUST be derived from real PYQ trends (e.g., if a topic appears every 2 years, it's high priority).
       - Each prediction must include reasoning based on past paper frequency.
    5. Build a topic frequency map.
    
    CRITICAL: Ensure the flashcards are exhaustive and cover every formula mentioned in the syllabus topics.
    
    Output exactly in this JSON format:
    {
        "mostImportantChapters": [{ "name": "Chapter Title", "topics": ["Topic A", "Topic B"], "frequency": 85 }],
        "leastImportantChapters": [{ "name": "Chapter Title", "topics": ["Topic X"], "frequency": 10 }],
        "flashcards": [{ 
            "chapter": "Chapter Name", 
            "cards": [{ "title": "Concept", "definition": "...", "formula": "...", "keyPoints": ["...", "..."] }] 
        }],
        "probableQuestions": [{ 
            "chapter": "Chapter Name", 
            "questions": [{ "question": "...", "marks": 5, "reasoning": "...", "repetitionLikelihood": "High" }] 
        }],
        "topicFrequencyMap": { "topic_name": 12 }
    }
    `;

    // Retry loop: up to 2 attempts
    for (let attempt = 0; attempt <= 1; attempt++) {
        try {
            console.log(`Starting Gemini analysis for: ${subjectName} (attempt ${attempt + 1})...`);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log("Gemini Raw Response Received.");

            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                console.error("No JSON found in Gemini response:", text);
                return null;
            }

            try {
                return JSON.parse(jsonMatch[0]);
            } catch (parseError) {
                console.error("JSON Parse Error in Gemini response:", parseError);
                return null;
            }
        } catch (error: any) {
            const msg: string = error?.message || "";
            const is429 = msg.includes("429") || msg.includes("Too Many Requests") || msg.includes("RESOURCE_EXHAUSTED");

            if (is429 && attempt === 0) {
                const waitSec = parseRetryAfter(msg);
                console.log(`[AI Analysis] Rate limited. Waiting ${waitSec}s before retry…`);
                await sleep(waitSec * 1000);
                continue;
            }

            if (is429) {
                // Throw structured error for the route to catch and send 429 to client
                const waitSec = parseRetryAfter(msg);
                throw Object.assign(new Error("RATE_LIMITED"), { retryAfter: waitSec });
            }

            console.error("Gemini API Error:", error.message);
            return null;
        }
    }
    return null;
}
