const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const PYQSchema = new mongoose.Schema({
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    year: { type: Number, required: true },
    questionText: { type: String, required: true },
    answerText: { type: String },
    fileUrl: { type: String },
    extractedContent: { type: Object }, // Store the JSONified content here
}, { timestamps: true });

const PYQ = mongoose.models.PYQ || mongoose.model('PYQ', PYQSchema);

async function extractContent() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not defined");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
        ]
    });

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const pyqs = await PYQ.find({ fileUrl: { $exists: true } });

        console.log(`Found ${pyqs.length} PYQs to process.`);

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        for (const pyq of pyqs) {
            if (pyq.extractedContent && pyq.extractedContent.questions && pyq.extractedContent.questions.length > 0) {
                console.log(`Skipping already processed: ${pyq.fileUrl}`);
                continue;
            }

            const filePath = path.join('public', pyq.fileUrl);
            if (!fs.existsSync(filePath)) {
                console.warn(`File not found: ${filePath}`);
                continue;
            }

            console.log(`Processing: ${pyq.fileUrl}...`);
            try {
                const pdfData = fs.readFileSync(filePath).toString("base64");

                const prompt = "Extract all questions from this exam paper and format them into a clean JSON array of strings. Each string should be one question. Only return the JSON array, no other text.";

                const result = await model.generateContent([
                    prompt,
                    {
                        inlineData: {
                            data: pdfData,
                            mimeType: "application/pdf"
                        }
                    }
                ]);

                const response = await result.response;
                const text = response.text();

                const jsonMatch = text.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    try {
                        const questions = JSON.parse(jsonMatch[0].trim());
                        pyq.extractedContent = { questions };
                        if (questions.length > 0) {
                            pyq.questionText = questions[0].substring(0, 150) + '...';
                        }
                        await pyq.save();
                        console.log(`Successfully extracted ${questions.length} questions for ${pyq.fileUrl}`);
                    } catch (e) {
                        console.error(`Failed to parse JSON for ${pyq.fileUrl}:`, e.message);
                    }
                } else {
                    console.error(`No JSON array found for ${pyq.fileUrl}`);
                }
            } catch (apiError) {
                console.error(`API Error for ${pyq.fileUrl}:`, apiError.message);
                if (apiError.message.includes('429')) {
                    console.log("Rate limit hit. Waiting 20s...");
                    await sleep(20000);
                }
            }
            await sleep(2000); // 2s gap between requests
        }

        console.log("Extraction process completed.");
        await mongoose.disconnect();
    } catch (e) {
        console.error("Extraction failed:", e);
    }
}

extractContent();
