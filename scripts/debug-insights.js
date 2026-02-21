import dbConnect from "./src/lib/db.js";
import SubjectInsight from "./src/models/SubjectInsight.js";
import Subject from "./src/models/Subject.js";

async function debugData() {
    await dbConnect();
    const insights = await SubjectInsight.find({});
    for (const insight of insights) {
        const subject = await Subject.findById(insight.subjectId);
        console.log(`\n--- Subject: ${subject?.name} (${insight.subjectId}) ---`);
        console.log(`Probable Questions Length: ${insight.probableQuestions?.length}`);
        if (insight.probableQuestions?.length > 0) {
            console.log(`First Question Sample:`, JSON.stringify(insight.probableQuestions[0], null, 2));
        }
    }
    process.exit(0);
}

debugData().catch(console.error);
