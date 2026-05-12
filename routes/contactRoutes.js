const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/', contactController.submitContactMessage);

// Admin-only routes
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, contactController.getAllContactMessages);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, contactController.deleteContactMessage);

module.exports = router;