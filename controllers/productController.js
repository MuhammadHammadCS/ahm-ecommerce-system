const Product = require('../models/productModel');

const productController = {
    // Get all products to display on the frontend
    getProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching products from database' });
        }
    },

    // Admin function to add a new product
    addProduct: async (req, res) => {
        try {
            const { name, description, price, stock, image_url, category_id } = req.body;
            
            // Validation
            if (!name || !price) {
                return res.status(400).json({ message: 'Product name and price are required' });
            }

            const productId = await Product.create({
                name, description, price, stock, image_url, category_id
            });

            res.status(201).json({ message: 'Product added successfully', productId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding product to database' });
        }
    },

    // Admin function to update price and stock
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const { price, stock } = req.body;

            if (price === undefined || stock === undefined) {
                return res.status(400).json({ message: 'Price and stock are required' });
            }
            if (isNaN(price) || isNaN(stock) || price < 0 || stock < 0) {
                return res.status(400).json({ message: 'Price and stock must be valid non-negative numbers' });
            }

            await Product.update(productId, parseFloat(price), parseInt(stock));
            res.json({ message: 'Product updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating product' });
        }
    },

    // Admin function to delete a product
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            await Product.delete(productId);
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting product from database' });
        }
    }
};

module.exports = productController;
