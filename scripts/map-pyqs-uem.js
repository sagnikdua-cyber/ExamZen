const fs = require('fs');
const path = require('path');

const subjects = JSON.parse(fs.readFileSync('subjects_list.json', 'utf8'));

const rawFiles = fs.readFileSync('extracted_files_utf8.txt', 'utf8');
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
        const name = s.name.toLowerCase();

        // 1. Direct code inclusion
        if (fullPath.includes(code)) return true;

        // 2. Handle UEM prefixes
        const codeNumMatch = s.code.match(/\d+/);
        if (codeNumMatch) {
            const num = codeNumMatch[0];
            const prefix = s.code.replace(/\d+/, '').toLowerCase(); // e.g., "ph"

            // Look for patterns like "ph101", "bscph101", "escee101"
            if (fullPath.includes(prefix + num)) return true;

            // Even more lenient: check if both prefix and number appear in the same name chunk
            const chunks = fileName.split(/[^a-z0-9]/);
            if (chunks.some(chunk => chunk.includes(prefix) && chunk.includes(num))) return true;
        }

        // 3. Name tokens
        const nameTokens = name.split(/\s+/).filter(t => t.length > 3 && t !== 'engineering' && t !== 'science');
        if (nameTokens.length > 0 && nameTokens.every(t => fullPath.includes(t))) return true;

        // 4. Manual keyword overrides for 100% accuracy
        const overrides = {
            'PH101': ['physics'],
            'CH101': ['chemistry'],
            'M101': ['math', 'calculus', 'statistics'],
            'M201': ['math', 'calculus'],
            'EE101': ['electrical'],
            'EC201': ['electronics'],
            'HU101': ['english', 'humanities'],
            'CS191': ['python'],
            'CS201': ['programming', 'language c'],
            'ME201': ['mechanics', 'engineering mechanics'],
            'ME202': ['mechanics', 'engineering mechanics'],
            'BI101': ['biology']
        };

        if (overrides[s.code]) {
            if (overrides[s.code].some(keyword => fullPath.includes(keyword))) {
                // To avoid M101/M201 collision, check semester
                if (s.code.startsWith('M')) {
                    const isSem1 = fullPath.includes('1st sem') || fullPath.includes('sem 1');
                    const isSem2 = fullPath.includes('2nd sem') || fullPath.includes('sem 2');
                    if (s.semester === 1 && isSem1) return true;
                    if (s.semester === 2 && isSem2) return true;
                    // If no sem in path, use code if possible
                    if (!isSem1 && !isSem2) return true;
                } else {
                    return true;
                }
            }
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
