const pool = require('../database');

const foodController = {
    getAllFood: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT * FROM food');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    createFood: async (req, res) => {
        try {
            const { name, category, description, image_url, sustainability_rating } = req.body;
            const query = 'INSERT INTO food (name, category, description, image_url, sustainability_rating) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [name, category, description, image_url, sustainability_rating];
            const { rows } = await pool.query(query, values);
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getFoodById: async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'SELECT * FROM food WHERE id = $1';
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                res.status(404).send('Food not found');
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    updateFood: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, category, description, image_url, sustainability_rating } = req.body;
            const query = 'UPDATE food SET name = $1, category = $2, description = $3, image_url = $4, sustainability_rating = $5 WHERE id = $6 RETURNING *';
            const values = [name, category, description, image_url, sustainability_rating, id];
            const { rows } = await pool.query(query, values);
            if (rows.length === 0) {
                res.status(404).send('Food not found');
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteFood: async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'DELETE FROM food WHERE id = $1 RETURNING *';
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                res.status(404).send('Food not found');
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = foodController;
