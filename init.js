const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true // Allow multiple SQL statements
});

async function initDatabase() {
    try {
        console.log('Initializing database...');

        // Read schema.sql
        const schema = fs.readFileSync('schema.sql', 'utf8');

        // Execute schema
        await pool.promise().query(schema);
        console.log('Schema created successfully.');

        // Read seed.sql
        const seed = fs.readFileSync('seed.sql', 'utf8');

        // Execute seed
        await pool.promise().query(seed);
        console.log('Seed data inserted successfully.');

        console.log('Database initialization complete!');
    } catch (error) {
        console.error('Error initializing database:', error.message);
        process.exit(1);
    } finally {
        pool.end();
    }
}

initDatabase();