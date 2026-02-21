import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Extract the retry-after seconds from a Gemini 429 error message
function parseRetryAfter(errorMessage: string): number {
  const match = errorMessage.match(/retry[^0-9]*(\d+\.?\d*)s/i);
  return match ? Math.ceil(parseFloat(match[1])) : 60;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateWithRetry(model: ReturnType<InstanceType<typeof GoogleGenerativeAI>['getGenerativeModel']>, prompt: string, maxRetries = 2) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (err: any) {
      const msg: string = err?.message || '';
      const is429 = msg.includes('429') || msg.includes('Too Many Requests') || msg.includes('RESOURCE_EXHAUSTED');

      if (is429 && attempt < maxRetries) {
        const waitSec = parseRetryAfter(msg);
        console.log(`[ESP-AI] Rate limited. Waiting ${waitSec}s before retry ${attempt + 1}/${maxRetries}…`);
        await sleep(waitSec * 1000);
        continue;
      }

      if (is429) {
        const waitSec = parseRetryAfter(msg);
        // Throw a structured rate-limit error the frontend can use
        throw Object.assign(new Error('RATE_LIMITED'), { retryAfter: waitSec });
      }

      throw err;
    }
  }
  throw new Error('Max retries exceeded');
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key missing' }, { status: 500 });

  const { subject, chapter, noteContent } = await req.json();

  if (!subject || !chapter) {
    return NextResponse.json({ error: 'Subject and chapter are required.' }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const contextNote = noteContent
    ? `\n\nAdditional context from uploaded notes:\n${noteContent}`
    : '';

  const prompt = `You are an expert teacher helping 1st year B.Tech students prepare for their ESP (Essential Studies for Professionals) exam internals.

Subject: ${subject}
Chapter: ${chapter}${contextNote}

Generate a JSON response (no markdown, no code fences, ONLY raw JSON) with this EXACT structure:
{
  "expectedQuestions": [
    { "question": "...", "marks": 5, "type": "short" },
    { "question": "...", "marks": 10, "type": "long" },
    { "question": "...", "marks": 5, "type": "short" },
    { "question": "...", "marks": 10, "type": "long" },
    { "question": "...", "marks": 5, "type": "short" }
  ],
  "modelAnswers": [
    { "question": "...", "answer": "...", "keyPoints": ["...", "...", "..."] },
    { "question": "...", "answer": "...", "keyPoints": ["...", "...", "..."] }
  ],
  "flashcards": [
    { "front": "...", "back": "..." },
    { "front": "...", "back": "..." },
    { "front": "...", "back": "..." },
    { "front": "...", "back": "..." },
    { "front": "...", "back": "..." },
    { "front": "...", "back": "..." }
  ]
}

Rules:
- expectedQuestions: 5 questions (mix of 5-mark and 10-mark)
- modelAnswers: 2 answers with detailed key points from the chapter
- flashcards: 6 cards covering key definitions, facts, and concepts from ${chapter}
- Keep answers suitable for 1st year B.Tech internal exam level
- Return ONLY the JSON, no other text`;

  try {
    const text = await generateWithRetry(model, prompt);
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed);
  } catch (err: any) {
    if (err?.message === 'RATE_LIMITED') {
      return NextResponse.json(
        { error: 'RATE_LIMITED', retryAfter: err.retryAfter ?? 60 },
        { status: 429 }
      );
    }
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('ESP AI Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
