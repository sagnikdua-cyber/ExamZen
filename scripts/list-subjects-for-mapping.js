const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const SubjectSchema = new mongoose.Schema({
    name: String,
    code: String,
    category: String,
    semester: Number
});

const Subject = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);

async function listSubjects() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const subjects = await Subject.find({});
        console.log('--- SUBJECTS ---');
        subjects.forEach(s => {
            console.log(`${s.code}|${s.name}|${s.category}|${s._id}`);
        });
        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

listSubjects();
