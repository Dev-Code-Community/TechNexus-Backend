const pool = require('../models/db');

const getAllEvents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const getOnlineEvents = async (req, res) => {
    try {
        console.log('in online events');
        const result = await pool.query(`SELECT * FROM events WHERE type = 'online'`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const getOfflineEvents = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM events WHERE type = 'offline'`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const createEvent = async (req, res) => {
    console.log('reaching create event api.');
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
};

module.exports = {
    getAllEvents,
    getOnlineEvents,
    getOfflineEvents,
    createEvent,
};
