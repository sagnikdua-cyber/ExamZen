const mongoose = require('mongoose');

const PYQSchema = new mongoose.Schema({
    subjectId: mongoose.Schema.Types.ObjectId,
    year: Number,
    fileUrl: String,
    questionText: String
});

const PYQ = mongoose.models.PYQ || mongoose.model('PYQ', PYQSchema);

async function verify() {
    await mongoose.connect('mongodb://127.0.0.1:27017/exam-prep-app');
    const pyqs = await PYQ.find({ fileUrl: /^\/pyqs\// });
    console.log(`TOTAL REAL MAPPINGS FOUND: ${pyqs.length}`);

    const subjectMappings = {};
    pyqs.forEach(p => {
        subjectMappings[p.subjectId] = (subjectMappings[p.subjectId] || 0) + 1;
    });

    console.log(`Unique subjects with real papers: ${Object.keys(subjectMappings).length}`);
    await mongoose.disconnect();
}

verify();
