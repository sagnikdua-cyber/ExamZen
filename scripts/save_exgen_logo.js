const fs = require('fs');
const https = require('https');

const file = fs.createWriteStream("public/exgen-logo.png");
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
};

// Download the ExamZen logo
const request = https.get("https://i.postimg.cc/9FZXqC8Y/exgen-logo.png", options, function (response) {
    response.pipe(file);
    file.on('finish', function () {
        file.close();
        console.log('ExamZen logo downloaded successfully!');
    });
}).on('error', function (err) {
    fs.unlink("public/exgen-logo.png", () => { });
    console.error('Error downloading logo:', err.message);
});
