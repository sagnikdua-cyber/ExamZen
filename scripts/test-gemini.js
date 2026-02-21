const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function test() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found in .env.local");
        return;
    }
    console.log("Using API Key:", apiKey.substring(0, 8) + "...");

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        console.log("Generating content...");
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error) {
        console.error("API Test Failed!");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);

        if (error.stack) console.error("Stack Trace:", error.stack);
        if (error.status) console.error("Status:", error.status);
        if (error.response) {
            console.error("Response:", JSON.stringify(error.response, null, 2));
        }
    }
}

test();
