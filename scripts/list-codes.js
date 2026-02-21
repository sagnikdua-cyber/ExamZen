const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: String,
    code: String
});

const Subject = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);

async function list() {
    await mongoose.connect('mongodb://127.0.0.1:27017/exam-prep-app');
    const subjects = await Subject.find({});
    subjects.forEach(s => {
        console.log(`${s.name} -> ${s.code}`);
    });
    await mongoose.disconnect();
}

list();
