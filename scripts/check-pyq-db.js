const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PYQSchema = new mongoose.Schema({
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    year: { type: Number, required: true },
    questionText: { type: String, required: true },
    fileUrl: { type: String },
    isImportant: { type: Boolean, default: false },
});

const PYQ = mongoose.models.PYQ || mongoose.model('PYQ', PYQSchema);

async function checkDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const papers = await PYQ.find({ fileUrl: { $exists: true, $ne: null } });
        console.log(`Found ${papers.length} papers with fileUrl.`);
        if (papers.length > 0) {
            console.log('Sample Paper:', JSON.stringify(papers[0], null, 2));
        }
        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

checkDB();
