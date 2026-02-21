const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function verifyIds() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const SubjectSchema = new mongoose.Schema({}, { strict: false });
        const Subject = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);

        const mapping = JSON.parse(fs.readFileSync('pyq_mapping_results.json', 'utf8'));
        const mappingIds = [...new Set(mapping.map(m => m.subjectId))];

        console.log('--- Mapping Verification ---');
        console.log(`Unique Subject IDs in JSON: ${mappingIds.length}`);

        const dbSubjects = await Subject.find({});
        const dbSubjectMap = {};
        dbSubjects.forEach(s => {
            dbSubjectMap[s._id.toString()] = s.name;
        });

        console.log(`Subjects in DB: ${dbSubjects.length}`);

        let matches = 0;
        let mismatches = 0;

        mappingIds.forEach(id => {
            if (dbSubjectMap[id]) {
                console.log(`MATCH: ${id} -> ${dbSubjectMap[id]}`);
                matches++;
            } else {
                console.log(`MISMATCH: ${id} not found in DB`);
                mismatches++;
            }
        });

        console.log(`\nResults: ${matches} matches, ${mismatches} mismatches`);

        if (mismatches > 0) {
            console.log('\nSuggested Fix: Re-run mapping script to get current IDs.');
        }

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

verifyIds();
