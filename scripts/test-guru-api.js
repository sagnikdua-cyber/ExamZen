// test-guru-api.js using built-in fetch

async function testApi() {
    const subjectId = '6998a849447d9358dc8da95a'; // Physics ID from earlier
    const res = await fetch('http://localhost:3000/api/ai-guru', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'What is the syllabus for Physics?',
            subjectId,
            history: []
        })
    });

    const data = await res.json();
    console.log('API Status:', res.status);
    console.log('API Response:', JSON.stringify(data, null, 2));
}

testApi().catch(console.error);
