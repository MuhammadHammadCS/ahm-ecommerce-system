const db = require('../config/db');

const Order = {
    // Core transaction: Create order -> Insert items -> Clear cart
    createOrder: async (userId, totalAmount, cartItems) => {
        // 1. Insert into orders
        const orderQuery = 'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)';
        const [orderResult] = await db.query(orderQuery, [userId, totalAmount, 'paid']);
        const orderId = orderResult.insertId;

        // 2. Insert into order_items
        for (let item of cartItems) {
            const itemQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
            // We use the price from the cart item to lock it in forever
            await db.query(itemQuery, [orderId, item.product_id, item.quantity, item.price]);
        }

        // 3. Clear user's cart
        const clearCartQuery = 'DELETE FROM cart_items WHERE user_id = ?';
        await db.query(clearCartQuery, [userId]);

        return orderId;
    },

    getOrdersByUser: async (userId) => {
        const query = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
        const [rows] = await db.query(query, [userId]);
        return rows;
    },
    
    getOrderItems: async (orderId) => {
        const query = `
            SELECT oi.*, p.name, p.image_url 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `;
        const [rows] = await db.query(query, [orderId]);
        return rows;
    }
};

module.exports = Order;
