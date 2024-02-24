const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sustainsage',
    password: 'postgrenik22156',
    port: 5432,
});

app.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT $1::text as message', ['Hello, world!']);
        const message = result.rows[0].message;
        res.send(message);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
