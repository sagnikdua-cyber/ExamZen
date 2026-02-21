const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const pyqDir = 'pyq';
const output = [];

fs.readdirSync(pyqDir).forEach(file => {
    if (file.endsWith('.zip')) {
        output.push(`--- ${file} ---`);
        try {
            const zip = new AdmZip(path.join(pyqDir, file));
            const zipEntries = zip.getEntries();
            zipEntries.forEach(entry => {
                if (!entry.isDirectory) {
                    output.push(entry.entryName);
                }
            });
        } catch (e) {
            output.push(`Error reading ${file}: ${e.message}`);
        }
    }
});

fs.writeFileSync('pyq_contents_detailed.txt', output.join('\n'));
console.log('Detailed contents written to pyq_contents_detailed.txt');
