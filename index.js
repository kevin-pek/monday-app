const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'reet2002',
  database : 'mydb'
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database');
});

connection.query(`
  CREATE TABLE user_prompts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    message_description TEXT,
    generated_prompt TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (error, results, fields) => {
  if (error) {
    console.error('Error creating the table:', error);
    return;
  }
  console.log('Table created successfully');
});

let userId = 'user_id';
let messageDescription = 'message_description';
let generatedPrompt = 'generated_prompt';

connection.query(`
  INSERT INTO user_prompts (user_id, message_description, generated_prompt)
  VALUES (?, ?, ?)
`, [userId, messageDescription, generatedPrompt], (error, results, fields) => {
  if (error) {
    console.error('Error inserting the data:', error);
    return;
  }
  console.log('Data inserted successfully');
});

let userId = 'exampleUserId';

connection.query(`
  SELECT *
  FROM user_prompts
  WHERE user_id = ?
  ORDER BY timestamp DESC
`, [userId], (error, results, fields) => {
  if (error) {
    console.error('Error querying the data:', error);
    return;
  }
  console.log('Data:', results);
});

connection.end();

const db = require('./database');

db.insertUserPrompt(userId, messageDescription, generatedPrompt, (err, results) => {
    if (err) {
        console.error('Error inserting the data:', err);
        return;
    }
    console.log('Data inserted successfully');
});

db.getUserPrompts(userId, (err, results) => {
    if (err) {
        console.error('Error querying the data:', err);
        return;
    }
    console.log('Data:', results);
});

