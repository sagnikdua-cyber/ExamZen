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
    const pyq = await PYQ.findOne({ fileUrl: /^\/pyqs\// });
    if (pyq) {
        console.log('SUCCESS: Found a real PYQ mapping!');
        console.log(`SubjectId: ${pyq.subjectId}`);
        console.log(`Year: ${pyq.year}`);
        console.log(`FileUrl: ${pyq.fileUrl}`);
    } else {
        console.log('FAILURE: No local PYQ mappings found in DB.');
    }
    await mongoose.disconnect();
}

verify();
