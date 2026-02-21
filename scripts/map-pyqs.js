const fs = require('fs');
const path = require('path');

const subjectsList = fs.readFileSync('subjects_list.txt', 'utf8')
    .split('\n')
    .filter(line => line.includes('|'))
    .map(line => {
        const [code, name, category, id] = line.split('|');
        return { code, name, category, id: id.trim() };
    });

const rawFiles = fs.readFileSync('extracted_files_list.txt', 'utf16le');
const files = rawFiles.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0 && line.toLowerCase().endsWith('.pdf'));

const mapping = [];

console.log(`Checking ${files.length} files against ${subjectsList.length} subjects...`);

files.forEach(file => {
    const fileName = path.basename(file).toLowerCase();
    const dirName = path.dirname(file).toLowerCase();
    const fullPath = file.toLowerCase();

    let matchedSubject = subjectsList.find(s => {
        const code = s.code.toLowerCase();
        const name = s.name.toLowerCase();

        // Match code if it's more than 3 chars (too avoid false positives with short strings)
        if (code.length > 2 && (fileName.includes(code) || dirName.includes(code))) return true;

        // Match name
        if (name.length > 3 && (fileName.includes(name) || dirName.includes(name))) return true;

        return false;
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
    }
});


fs.writeFileSync('pyq_mapping_results.json', JSON.stringify(mapping, null, 2));
console.log(`Mapped ${mapping.length} files to subjects.`);
