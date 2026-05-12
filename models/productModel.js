const db = require('../config/db');

const Product = {
    // Fetch all products, including their category name
    getAll: async () => {
        const query = `
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.created_at DESC
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // Fetch a single product
    getById: async (id) => {
        const query = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    // Admin: Create a new product
    create: async (productData) => {
        const query = `
            INSERT INTO products (name, description, price, stock, image_url, category_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [
            productData.name, 
            productData.description, 
            productData.price, 
            productData.stock || 0, 
            productData.image_url || null, 
            productData.category_id || null
        ]);
        return result.insertId;
    },
    
    // Admin: Update price and/or stock of a product
    update: async (id, price, stock) => {
        const query = 'UPDATE products SET price = ?, stock = ? WHERE id = ?';
        await db.query(query, [price, stock, id]);
    },

    // Admin: Delete a product
    delete: async (id) => {
        const query = 'DELETE FROM products WHERE id = ?';
        await db.query(query, [id]);
    }
};

module.exports = Product;
