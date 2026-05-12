const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool instead of a single connection
// This allows the application to handle multiple concurrent requests efficiently
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommerce_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection (optional but good for debugging startup)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database. Please check your MySQL server and credentials.', err.message);
    } else {
        console.log('Successfully connected to the MySQL database!');
        connection.release(); // release the connection back to the pool
    }
});

// Export the promise-wrapped pool so we can use async/await in our models
module.exports = pool.promise();
