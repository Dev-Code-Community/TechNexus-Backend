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

// Use middleware to parse JSON in request body
app.use(express.json());

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
    const { title, date, type, description, link } = req.body;

    let trimmedTitle;
    if (!title || (trimmedTitle = title.trim()).length == 0) {
        return res.status(400).json({error: 'Title required.'})
    }

    let dateObj;
    if (isNaN((dateObj = new Date(date)).getTime())) {
        return res.status(400).json({error: 'Invalid date.'})
    }
    
    if (type && !['offline', 'online'].includes(type)) {
        return res.status(400).json({error: 'Invalid type. Allowed types: online/offline.'})
    }
    
    try {
        const result = await pool.query('INSERT INTO events (title, date, type, description, image, link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [trimmedTitle, dateObj, type, description.trim(), null, link]);
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