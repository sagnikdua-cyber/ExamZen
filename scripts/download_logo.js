const fs = require('fs');
const https = require('https');

const file = fs.createWriteStream("public/logo.png");
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

const request = https.get("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sJ5e6-wJ6a9f-g7h-jJ5k-l8m-n0p9q8r7s", options, function (response) {
    response.pipe(file);
});
