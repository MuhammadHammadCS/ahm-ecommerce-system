const Cart = require('../models/cartModel');

const cartController = {
    // GET /api/cart
    viewCart: async (req, res) => {
        try {
            const userId = req.user.id; // Extracted securely from the JWT token
            const cartItems = await Cart.getCartByUserId(userId);
            res.json(cartItems);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching cart' });
        }
    },

    // POST /api/cart
    addToCart: async (req, res) => {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;

            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }

            // If the item is already in the cart, just increase the quantity
            const existingItem = await Cart.checkItemInCart(userId, productId);
            if (existingItem) {
                const newQuantity = existingItem.quantity + (quantity || 1);
                await Cart.updateQuantity(existingItem.id, newQuantity);
                return res.json({ message: 'Cart updated successfully' });
            }

            // Otherwise, insert a new row
            await Cart.addItem(userId, productId, quantity || 1);
            res.status(201).json({ message: 'Item added to cart' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding to cart' });
        }
    },

    // DELETE /api/cart/:id
    removeFromCart: async (req, res) => {
        try {
            const cartItemId = req.params.id;
            await Cart.removeItem(cartItemId);
            res.json({ message: 'Item removed from cart' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error removing item' });
        }
    }
};

module.exports = cartController;
