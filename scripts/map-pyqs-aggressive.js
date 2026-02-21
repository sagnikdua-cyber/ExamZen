const fs = require('fs');
const path = require('path');

const subjects = JSON.parse(fs.readFileSync('subjects_list.json', 'utf8'));

const rawFiles = fs.readFileSync('extracted_files_list.txt', 'utf16le');
const files = rawFiles.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0 && line.toLowerCase().endsWith('.pdf'));

const mapping = [];
const missed = [];

console.log(`Checking ${files.length} files against ${subjects.length} subjects...`);

const clean = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

files.forEach(file => {
    const fileName = path.basename(file).toLowerCase();
    const dirName = path.dirname(file).toLowerCase();
    const fullPath = file.toLowerCase();

    let matchedSubject = subjects.find(s => {
        const code = clean(s.code);
        const name = clean(s.name);

        // 1. Direct code inclusion
        if (code.length > 2 && fullPath.includes(code)) return true;

        // 2. Direct name inclusion (if name is long enough)
        if (name.length > 4 && fullPath.includes(name)) return true;

        // 3. Partial name matching for common subjects
        const commonShortNames = ['physics', 'chemistry', 'math', 'calculus', 'electronics', 'electrical', 'biology', 'english', 'python'];
        for (const sn of commonShortNames) {
            if (fullPath.includes(sn) && s.name.toLowerCase().includes(sn)) return true;
        }

        return false;
    });

    if (matchedSubject) {
        let yearMatch = fullPath.match(/20\d{2}/);
        let year = yearMatch ? parseInt(yearMatch[0]) : 2024;

        mapping.push({
            subjectId: matchedSubject._id,
            subjectCode: matchedSubject.code,
            subjectName: matchedSubject.name,
            year: year,
            filePath: file,
            fileName: path.basename(file)
        });
    } else {
        missed.push(file);
    }
});

fs.writeFileSync('pyq_mapping_results.json', JSON.stringify(mapping, null, 2));
fs.writeFileSync('pyq_missed_files.txt', missed.join('\n'));
console.log(`Mapped ${mapping.length} files. Missed ${missed.length} files.`);
if (mapping.length > 0) {
    const stats = mapping.reduce((acc, m) => {
        acc[m.subjectCode] = (acc[m.subjectCode] || 0) + 1;
        return acc;
    }, {});
    console.log('Mapping Stats:', JSON.stringify(stats, null, 2));
}
