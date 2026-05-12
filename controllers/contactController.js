const db = require('../config/db');

// Submit contact message
const submitContactMessage = async (req, res) => {
    try {
        const { email, phone, message } = req.body;

        // Validate required fields
        if (!email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Email and message are required fields.'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }

        // Insert into database
        const [result] = await db.execute(
            'INSERT INTO contact_messages (email, phone, message) VALUES (?, ?, ?)',
            [email, phone || null, message]
        );

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully. We\'ll get back to you soon!',
            messageId: result.insertId
        });

    } catch (error) {
        console.error('Error submitting contact message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
};

// Get all contact messages (admin only)
const getAllContactMessages = async (req, res) => {
    try {
        const [messages] = await db.execute(
            'SELECT id, email, phone, message, submitted_at FROM contact_messages ORDER BY submitted_at DESC'
        );

        res.json({
            success: true,
            messages: messages
        });

    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages.'
        });
    }
};

// Delete contact message (admin only)
const deleteContactMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            'DELETE FROM contact_messages WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Message not found.'
            });
        }

        res.json({
            success: true,
            message: 'Message deleted successfully.'
        });

    } catch (error) {
        console.error('Error deleting contact message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete message.'
        });
    }
};

module.exports = {
    submitContactMessage,
    getAllContactMessages,
    deleteContactMessage
};