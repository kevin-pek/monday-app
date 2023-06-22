const express = require('express');
const db = require('./database');

const app = express();

app.use(express.json());

app.post('/message', (req, res) => {
    const { username, email, recipientName, recipientType, description, prompt } = req.body;

    db.insertUser(username, email, (err, userResults) => {
        if (err) {
            console.error('Error inserting the user:', err);
            return res.status(500).send('Server error');
        }

        const userId = userResults.insertId;

        db.insertRecipient(recipientName, recipientType, (err, recipientResults) => {
            if (err) {
                console.error('Error inserting the recipient:', err);
                return res.status(500).send('Server error');
            }

            const recipientId = recipientResults.insertId;

            db.insertMessage(userId, recipientId, description, prompt, (err) => {
                if (err) {
                    console.error('Error inserting the message:', err);
                    return res.status(500).send('Server error');
                }

                res.send('Data inserted successfully');
            });
        });
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
