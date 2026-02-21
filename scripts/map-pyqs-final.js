const fs = require('fs');
const path = require('path');

const subjects = [
    { name: "Basic Electronics Engineering", code: "EC201" },
    { name: "Mathematics and Basic Statistics", code: "M101" },
    { name: "Mathematics Calculus", code: "M201" },
    { name: "Programming Language C", code: "CS201" },
    { name: "Chemistry", code: "CH101" },
    { name: "Physics", code: "PH101" },
    { name: "Engineering Mechanics Essential", code: "ME201" },
    { name: "Engineering Mechanics Principles", code: "ME202" },
    { name: "Basic Electrical Engineering", code: "EE101" },
    { name: "English", code: "HU101" },
    { name: "Biology", code: "BI101" },
    { name: "Python", code: "CS191" }
];

const sourceDir = path.join(__dirname, 'extracted_pyq');
const targetDir = path.join(__dirname, 'public', 'pyqs');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, file));
        }
    });

    return arrayOfFiles;
}

const allPdfs = getAllFiles(sourceDir).filter(f => f.endsWith('.pdf'));

const mapping = {
    'Biology': 'BI101',
    'BE104': 'BI101',
    'Chemistry': 'CH101',
    'CH102': 'CH101',
    'CH202': 'CH101',
    'Calculus': 'M201',
    'M103A': 'M201',
    'M203': 'M201',
    'Mathematics and Basic Statistics': 'M101',
    'M101': 'M101',
    'M103B': 'M101',
    'Physics': 'PH101',
    'PH101': 'PH101',
    'PH201': 'PH101',
    'Python': 'CS191',
    'CS101': 'CS191',
    'CS191': 'CS191',
    'Programming for Problem Solving using C': 'CS201',
    'Language C': 'CS201',
    'CS102': 'CS201',
    'CS201': 'CS201',
    'Basic Electronics': 'EC201',
    'EC101': 'EC201',
    'EC201': 'EC201',
    'Electronics': 'EC201',
    'Basic Electrical': 'EE101',
    'EE101': 'EE101',
    'Electrical': 'EE101',
    'Mechanics - Principles': 'ME202',
    'ME102A': 'ME202',
    'ME202': 'ME202',
    'Mechanics - Essentials': 'ME201',
    'ME102B': 'ME201',
    'ME201': 'ME201',
    'English': 'HU101',
    'HSMC101': 'HU101',
    'HU101': 'HU101'
};

const results = [];

allPdfs.forEach(pdfPath => {
    const fileName = path.basename(pdfPath);
    const parentDir = path.dirname(pdfPath);

    // Extract year from path or filename
    let year = "2023"; // default
    const yearMatch = pdfPath.match(/20\d{2}/);
    if (yearMatch) year = yearMatch[0];

    let matchedCode = null;
    for (const [key, code] of Object.entries(mapping)) {
        if (fileName.toLowerCase().includes(key.toLowerCase())) {
            matchedCode = code;
            break;
        }
    }

    if (matchedCode) {
        const destName = `${matchedCode}_${year}.pdf`;
        const destPath = path.join(targetDir, destName);
        fs.copyFileSync(pdfPath, destPath);
        results.push({
            original: fileName,
            code: matchedCode,
            year: year,
            dest: destName
        });
        console.log(`Mapped: ${fileName} -> ${destName}`);
    } else {
        console.log(`No match for: ${fileName}`);
    }
});

fs.writeFileSync('pyq_mapping_results.json', JSON.stringify(results, null, 2));
console.log(`Total mapped: ${results.length}`);
