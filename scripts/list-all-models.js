require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        fs.writeFileSync('all_models.json', JSON.stringify(data, null, 2));
        console.log("Done. Check all_models.json");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

listModels();
