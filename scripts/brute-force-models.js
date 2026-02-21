const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function bruteForceModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const listResponse = await fetch(url);
        const listData = await listResponse.json();

        if (!listResponse.ok) {
            console.error("List failed!", listResponse.status);
            return;
        }

        const genModels = listData.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
        console.log(`Testing ${genModels.length} models...`);

        const genAI = new GoogleGenerativeAI(apiKey);

        for (const modelInfo of genModels) {
            const modelName = modelInfo.name.replace("models/", "");
            console.log(`Testing: ${modelName} (${modelInfo.displayName})...`);

            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("hello");
                const response = await result.response;
                console.log(`✅ SUCCESS with ${modelName}: ${response.text().substring(0, 20)}...`);
                return; // Stop at first success
            } catch (error) {
                console.log(`❌ FAILED ${modelName}: ${error.message} (Status: ${error.status || '?'})`);
            }
        }
        console.log("No working models found.");
    } catch (error) {
        console.error("Fatal Error:", error.stack);
    }
}

bruteForceModels();
