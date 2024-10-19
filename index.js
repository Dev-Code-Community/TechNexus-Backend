const express = require('express');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());

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
        console.log('online events:', result.rows);
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

//write a post request for api :  return axios.post(`${API_BASE_URL}/createevent`, eventData);


app.post('/createevent', (req, res) => {

    const title = req.body.title ?? '';
    const date = req.body.date ?? '';
    const description = req.body.description ?? '';
    const image = req.body.image ?? '';
    const link = req.body.link ?? '';
    const type = req.body.type ?? '';
    const location = req.body.location ?? {};
    const lat = location.lat ?? '';
    const lng = location.lng ?? '';

    const amenity = location.amenity ?? '';
    const city = location.city ?? '';
    const country = location.country ?? '';
    const state = location.state ?? '';
    const postalCode = location.postalCode ?? '';


    console.log(image, link, lat, lng, amenity, city, country, state, postalCode, title, description, date);
    const query = `
    INSERT INTO events (title, date,type, description, image, link, lat, lng, amenity, city, country, state, postalCode)
    VALUES ($1, $2, $13, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
    const values = [title, date, description, image, link, lat, lng, amenity, city, country, state, postalCode, type];

    try {
        const result = pool.query(query, values)
            .then(result => {
                res.status(200).json({ message: 'Event created successfully' });
            })
            .catch(err => {
                res.status(200).json({ message: 'Event created successfully' });
            });
    }
    catch (err) {
        console.error('Error inserting event data:', err);
        res.status(500).json({ error: 'Failed to create event' });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});