const fs = require('fs');
const path = require('path');

const subjectsList = fs.readFileSync('subjects_list.txt', 'utf8')
    .split(/\r?\n/)
    .filter(line => line.includes('|'))
    .map(line => {
        const parts = line.split('|').map(p => p.trim());
        if (parts.length < 4) return null;
        const [code, name, category, id] = parts;
        return { code, name, category, id };
    })
    .filter(s => s !== null);

const rawFiles = fs.readFileSync('extracted_files_list.txt', 'utf16le');
const files = rawFiles.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0 && line.toLowerCase().endsWith('.pdf'));

const mapping = [];
const missed = [];

console.log(`Checking ${files.length} files against ${subjectsList.length} subjects...`);

files.forEach(file => {
    const fileName = path.basename(file).toLowerCase();
    const dirName = path.dirname(file).toLowerCase();

    let matchedSubject = subjectsList.find(s => {
        const code = s.code.toLowerCase();
        const name = s.name.toLowerCase();

        // Lenient matching
        return fileName.includes(code) ||
            dirName.includes(code) ||
            fileName.includes(name) ||
            dirName.includes(name);
    });

    if (matchedSubject) {
        let yearMatch = fileName.match(/20\d{2}/) || dirName.match(/20\d{2}/);
        let year = yearMatch ? parseInt(yearMatch[0]) : 2024;

        mapping.push({
            subjectId: matchedSubject.id,
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
if (mapping.length > 0) console.log('Sample match:', JSON.stringify(mapping[0], null, 2));
