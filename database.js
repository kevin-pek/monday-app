const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

module.exports = pool;

const insertUserPrompt = (userId, messageDescription, generatedPrompt, callback) => {
    pool.query(`
        INSERT INTO user_prompts (user_id, message_description, generated_prompt)
        VALUES (?, ?, ?)
    `, [userId, messageDescription, generatedPrompt], callback);
}

const getUserPrompts = (userId, callback) => {
    pool.query(`
        SELECT *
        FROM user_prompts
        WHERE user_id = ?
        ORDER BY timestamp DESC
    `, [userId], callback);
}

function insertUser(username, email, callback) {
    pool.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], callback);
}

function insertRecipient(name, type, callback) {
    pool.query('INSERT INTO recipients (name, type) VALUES (?, ?)', [name, type], callback);
}

function insertMessage(user_id, recipient_id, description, prompt, callback) {
    pool.query('INSERT INTO messages (user_id, recipient_id, description, prompt) VALUES (?, ?, ?, ?)', [user_id, recipient_id, description, prompt], callback);
}

module.exports = {
    insertUser,
    insertRecipient,
    insertMessage,
    getUserPrompts,
    insertUserPrompt
};

