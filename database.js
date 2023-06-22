const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'reet2002',
    database        : 'mydb'
});

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

module.exports = {
    insertUserPrompt,
    getUserPrompts,
};

