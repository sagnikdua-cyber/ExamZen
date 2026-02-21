const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: String,
    code: String
});

const Subject = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);

async function dump() {
    await mongoose.connect('mongodb://127.0.0.1:27017/exam-prep-app');
    const subjects = await Subject.find({});
    console.log(JSON.stringify(subjects, null, 2));
    await mongoose.disconnect();
}

dump();
