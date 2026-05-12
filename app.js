const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Initialize the Express application
const app = express();

// --- Middlewares ---
// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'assets' folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// --- Routes ---
// Basic test route to ensure server is running
app.get('/api/test', (req, res) => {
    res.json({ message: 'Ecommerce API is running!' });
});

// Future routes will be imported and used here, e.g.:
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contact', contactRoutes);

// --- Server Initialization ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});