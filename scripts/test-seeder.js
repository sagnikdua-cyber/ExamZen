const http = require('http');

http.get('http://localhost:3000/api/seed-pyqs', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('Seed Response:', JSON.stringify(json, null, 2));
        } catch (e) {
            console.log('Error parsing JSON:', e.message);
            console.log('Raw data:', data);
        }
    });
}).on('error', (err) => {
    console.log('Error:', err.message);
});
