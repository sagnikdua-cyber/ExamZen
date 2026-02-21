const { MongoClient, ObjectId } = require('mongodb');

async function migrate() {
    const uri = "mongodb://localhost:27017/exam-prep-app";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("exam-prep-app");
        const collection = db.collection("subjectinsights");

        const insights = await collection.find({}).toArray();
        console.log(`Found ${insights.length} insights.`);

        for (const insight of insights) {
            const pq = insight.probableQuestions;
            if (!pq || pq.length === 0) continue;

            // Check if it's already in the new format
            const isNewFormat = pq[0] && pq[0].chapter && Array.isArray(pq[0].questions);

            if (!isNewFormat) {
                console.log(`Migrating subject ${insight.subjectId}...`);

                // Convert old flat list to new grouped format
                const newQuestions = pq.map(q => {
                    if (typeof q === 'string') {
                        return {
                            question: q,
                            marks: 5,
                            reasoning: "Derived from past year paper trends.",
                            repetitionLikelihood: "High"
                        };
                    }
                    // Handle case where it was an array of objects but without chapter
                    return {
                        question: q.question || JSON.stringify(q),
                        marks: q.marks || 5,
                        reasoning: q.reasoning || "Derived from past year paper trends.",
                        repetitionLikelihood: q.repetitionLikelihood || "High"
                    };
                });

                const updatedPQ = [{
                    chapter: "General / Predicted",
                    questions: newQuestions
                }];

                await collection.updateOne(
                    { _id: insight._id },
                    { $set: { probableQuestions: updatedPQ } }
                );
                console.log(`Successfully migrated subject ${insight.subjectId}.`);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

migrate();
residential
