require('dotenv').config({ path: '.env.local' });

async function testGeminiDirect() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("API Key not found in .env.local");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    console.log("Testing direct API call to:", `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.substring(0, 5)}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: "Say 'Hello, direct call working!'" }]
                }]
            })
        });

        const data = await response.json();
        console.log("Status:", response.status);
        if (response.ok) {
            console.log("Response:", data.candidates[0].content.parts[0].text);
            console.log("DIRECT API TEST SUCCESSFUL!");
        } else {
            console.error("DIRECT API TEST FAILED!");
            console.error("Error Data:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Fetch Error:", error.message);
    }
}

testGeminiDirect();
