const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function dumpIds() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const SubjectSchema = new mongoose.Schema({}, { strict: false });
        const Subject = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);

        const subjects = await Subject.find({});
        const data = subjects.map(s => ({
            id: s._id.toString(),
            name: s.name,
            code: s.code
        }));

        fs.writeFileSync('db_subjects_ids.json', JSON.stringify(data, null, 2));
        console.log(`Dumped ${data.length} subjects to db_subjects_ids.json`);
        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

dumpIds();
