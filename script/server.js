const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Подключение к базе данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username', // Замените на ваше имя пользователя
    password: 'your_password', // Замените на ваш пароль
    database: 'marker_db'
});

// Проверка подключения
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Создание маркера
app.post('/markers', (req, res) => {
    const { user_id, marker } = req.body;
    const query = 'INSERT INTO user_markers (user_id, marker) VALUES (?, ?)';
    
    db.query(query, [user_id, marker], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, user_id, marker });
    });
});

app.get('/markers/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const query = 'SELECT * FROM user_markers WHERE user_id = ?';
    
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});     

app.put('/markers/:id', (req, res) => {
    const markerId = req.params.id;
    const { marker } = req.body;
    const query = 'UPDATE user_markers SET marker = ?, updated_at = NOW() WHERE id = ?';
    
    db.query(query, [marker, markerId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: markerId, marker });
    });
});