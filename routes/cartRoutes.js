const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Apply the verifyToken middleware to ALL routes in this file
// This ensures that an unauthenticated user can never access or modify a cart
router.use(verifyToken); 

router.get('/', cartController.viewCart);
router.post('/', cartController.addToCart);
router.delete('/:id', cartController.removeFromCart);

module.exports = router;
