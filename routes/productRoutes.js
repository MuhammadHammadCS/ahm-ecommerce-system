const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Public route: Everyone can view products
router.get('/', productController.getProducts);

// Protected route: Only admins can add products
router.post('/', verifyToken, isAdmin, productController.addProduct);

// Protected route: Only admins can update price/stock
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);

// Protected route: Only admins can delete products
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
