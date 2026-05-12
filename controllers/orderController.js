const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const orderController = {
    checkout: async (req, res) => {
        try {
            const userId = req.user.id;
            
            // 1. Fetch user cart to verify items exist
            const cartItems = await Cart.getCartByUserId(userId);
            if (cartItems.length === 0) {
                return res.status(400).json({ message: 'Cart is empty' });
            }

            // 2. Calculate Total Server-Side (Never trust frontend prices!)
            let totalAmount = 0;
            cartItems.forEach(item => {
                totalAmount += item.price * item.quantity;
            });

            // 3. Create Order
            const orderId = await Order.createOrder(userId, totalAmount, cartItems);

            res.status(201).json({ message: 'Order placed successfully', orderId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error processing checkout' });
        }
    },

    getHistory: async (req, res) => {
        try {
            const userId = req.user.id;
            const orders = await Order.getOrdersByUser(userId);
            
            // Fetch items for each order
            for (let order of orders) {
                order.items = await Order.getOrderItems(order.id);
            }

            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching order history' });
        }
    }
};

module.exports = orderController;
