const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Using API Key:", apiKey ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 4)}` : "NOT FOUND");

    if (!apiKey) return;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
        console.log("Sending test prompt to gemini-2.0-flash...");
        const result = await model.generateContent("Say 'Hello, I am working!'");
        const response = await result.response;
        console.log("Response:", response.text());
        console.log("API TEST SUCCESSFUL!");
    } catch (error) {
        console.error("API TEST FAILED!");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        if (error.response) {
            console.error("Error Response:", JSON.stringify(error.response, null, 2));
        }
        if (error.status) console.log("Status:", error.status);
    }
}

testGemini();
