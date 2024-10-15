const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'events_db',
    password: 'password',
    port: 5432,
});

// Use CORS to allow requests from the React app
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello from the Node.js backend!');
});

app.get('/events', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/events/online', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM events WHERE type = 'online'`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/events/offline', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM events WHERE type = 'offline'`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/events', async (req, res) => {
    try {
        const result = await pool.query('INSERT INTO events (name, date) VALUES ($1, $2) RETURNING *', ['New event', new Date()]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});