// foodController.js
const pool = require('../database');

const foodController = {
    getAllFood: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT * FROM food');
            res.json(rows);
        } catch (error) {
            console.error('Error fetching food:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createFood: async (req, res) => {
        const { name, category, description, image_url, sustainability_rating } = req.body;
        try {
            const { rows } = await pool.query(
                'INSERT INTO food (name, category, description, image_url, sustainability_rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, category, description, image_url, sustainability_rating]
            );
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error('Error creating food:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getFoodById: async (req, res) => {
        const { id } = req.params;
        try {
            const { rows } = await pool.query('SELECT * FROM food WHERE id = $1', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Food not found' });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error('Error fetching food by ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateFood: async (req, res) => {
        const { id } = req.params;
        const { name, category, description, image_url, sustainability_rating } = req.body;
        try {
            const { rows } = await pool.query(
                'UPDATE food SET name = $1, category = $2, description = $3, image_url = $4, sustainability_rating = $5 WHERE id = $6 RETURNING *',
                [name, category, description, image_url, sustainability_rating, id]
            );
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Food not found' });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error('Error updating food:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteFood: async (req, res) => {
        const { id } = req.params;
        try {
            const { rowCount } = await pool.query('DELETE FROM food WHERE id = $1', [id]);
            if (rowCount === 0) {
                return res.status(404).json({ message: 'Food not found' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting food:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = foodController;