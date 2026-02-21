const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const SubjectSchema = new mongoose.Schema({
    name: String,
    code: String,
    category: String,
    semester: Number
});

const Subject = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);

async function exportSubjects() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const subjects = await Subject.find({});
        fs.writeFileSync('subjects_list.json', JSON.stringify(subjects, null, 2));
        console.log(`Exported ${subjects.length} subjects to subjects_list.json`);
        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

exportSubjects();
