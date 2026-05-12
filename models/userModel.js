const db = require('../config/db');

const User = {
    // Insert a new user into the database
    create: async (userData) => {
        const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [
            userData.name, 
            userData.email, 
            userData.password, 
            userData.role || 'customer'
        ]);
        return result.insertId;
    },

    // Find a user by their email address (used for login and checking duplicates)
    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.query(query, [email]);
        return rows[0]; // Return the first matched user, or undefined
    },

    // Find a user by ID (useful for profile fetching)
    findById: async (id) => {
        // We omit the password from the SELECT statement for security
        const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = User;
