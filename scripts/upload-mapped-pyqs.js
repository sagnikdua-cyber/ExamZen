const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

// Re-defining the schema for standalone script use
const PYQSchema = new mongoose.Schema({
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    year: { type: Number, required: true },
    questionText: { type: String, required: true },
    answerText: { type: String },
    fileUrl: { type: String },
    topics: [{ type: String }],
    chapter: { type: String },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    marks: { type: Number, default: 2 },
    repetitionCount: { type: Number, default: 1 },
    isImportant: { type: Boolean, default: false },
    isPredicted: { type: Boolean, default: false },
}, { timestamps: true });

const PYQ = mongoose.models.PYQ || mongoose.model('PYQ', PYQSchema);

async function uploadPapers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const mapping = JSON.parse(fs.readFileSync('pyq_mapping_results.json', 'utf8'));

        console.log(`Starting upload of ${mapping.length} papers...`);

        for (const entry of mapping) {
            const targetFileName = `${entry.subjectCode}_${entry.year}_${path.basename(entry.filePath).replace(/\s+/g, '_')}`;
            const targetPath = path.join('public', 'pyq-papers', targetFileName);

            // 1. Copy file
            fs.copyFileSync(entry.filePath, targetPath);

            // 2. Create DB entry
            const pyqData = {
                subjectId: entry.subjectId,
                year: entry.year,
                questionText: `University Question Paper - ${entry.year}`, // Summary text for now
                fileUrl: `/pyq-papers/${targetFileName}`,
                isImportant: true // University papers are always important
            };

            const existing = await PYQ.findOne({
                subjectId: entry.subjectId,
                year: entry.year,
                fileUrl: pyqData.fileUrl
            });

            if (!existing) {
                await PYQ.create(pyqData);
                console.log(`Uploaded: ${entry.subjectCode} - ${entry.year}`);
            } else {
                console.log(`Skipped (Exists): ${entry.subjectCode} - ${entry.year}`);
            }
        }

        console.log('Upload process completed.');
        await mongoose.disconnect();
    } catch (e) {
        console.error('Upload failed:', e);
    }
}

uploadPapers();
