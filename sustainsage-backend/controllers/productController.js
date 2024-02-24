const pool = require('../database');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT * FROM products');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    createProduct: async (req, res) => {
        try {
            const { name, category, description, image_url, sustainability_rating } = req.body;
            const query = 'INSERT INTO products (name, category, description, image_url, sustainability_rating) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [name, category, description, image_url, sustainability_rating];
            const { rows } = await pool.query(query, values);
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'SELECT * FROM products WHERE id = $1';
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                res.status(404).send('Product not found');
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, category, description, image_url, sustainability_rating } = req.body;
            const query = 'UPDATE products SET name = $1, category = $2, description = $3, image_url = $4, sustainability_rating = $5 WHERE id = $6 RETURNING *';
            const values = [name, category, description, image_url, sustainability_rating, id];
            const { rows } = await pool.query(query, values);
            if (rows.length === 0) {
                res.status(404).send('Product not found');
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                res.status(404).send('Product not found');
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = productController;
