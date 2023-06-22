const express = require('express');
const db = require('./database');

const app = express();

app.use(express.json());

app.post('/message', (req, res) => {
    const { userId, messageDescription, generatedPrompt } = req.body;

    db.insertUserPrompt(userId, messageDescription, generatedPrompt, (err) => {
        if (err) {
            console.error('Error inserting the data:', err);
            return res.status(500).send('Server error');
        }

        res.send('Data inserted successfully');
    });
});

app.get('/messages/:userId', (req, res) => {
    const { userId } = req.params;

    db.getUserPrompts(userId, (err, results) => {
        if (err) {
            console.error('Error getting the data:', err);
            return res.status(500).send('Server error');
        }

        res.json(results);
    });
});

const port = process.env.DB_PORT || 3000;

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
