const db = require('../config/db');

const Cart = {
    // Join cart_items with products to get full details for the UI
    getCartByUserId: async (userId) => {
        const query = `
            SELECT c.id as cart_item_id, c.quantity, p.id as product_id, p.name, p.price, p.image_url 
            FROM cart_items c 
            JOIN products p ON c.product_id = p.id 
            WHERE c.user_id = ?
        `;
        const [rows] = await db.query(query, [userId]);
        return rows;
    },
    
    // Check if a specific product is already in the user's cart
    checkItemInCart: async (userId, productId) => {
        const query = 'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?';
        const [rows] = await db.query(query, [userId, productId]);
        return rows[0];
    },

    // Insert a new item into the cart
    addItem: async (userId, productId, quantity = 1) => {
        const query = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [userId, productId, quantity]);
        return result.insertId;
    },

    // Increase or update the quantity of an existing cart item
    updateQuantity: async (cartItemId, newQuantity) => {
        const query = 'UPDATE cart_items SET quantity = ? WHERE id = ?';
        await db.query(query, [newQuantity, cartItemId]);
    },

    // Delete an item from the cart entirely
    removeItem: async (cartItemId) => {
        const query = 'DELETE FROM cart_items WHERE id = ?';
        await db.query(query, [cartItemId]);
    }
};

module.exports = Cart;
