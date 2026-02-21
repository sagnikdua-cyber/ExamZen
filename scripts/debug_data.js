const { MongoClient } = require('mongodb');
const fs = require('fs');

async function run() {
    const client = new MongoClient('mongodb://localhost:27017/exam-prep-app');
    await client.connect();
    const insights = await client.db('exam-prep-app').collection('subjectinsights').find({}).toArray();

    const report = insights.map(i => ({
        subjectId: i.subjectId,
        pqType: typeof i.probableQuestions,
        isArray: Array.isArray(i.probableQuestions),
        sample: i.probableQuestions ? i.probableQuestions.slice(0, 2) : null
    }));

    fs.writeFileSync('debug_report.json', JSON.stringify(report, null, 2));
    process.exit(0);
}
run();
