const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // 1. Basic validation
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // 2. Check if user already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // 3. Hash the password for security
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 4. Save the new user to the database
            const userId = await User.create({
                name,
                email,
                password: hashedPassword,
                role: 'customer' // default role
            });

            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during registration' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // 1. Find user by email
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // 2. Verify the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // 3. Generate JWT Token for session management
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET || 'default_secret_key',
                { expiresIn: '1d' } // Token expires in 1 day
            );

            // 4. Send response back to the client
            res.json({
                message: 'Logged in successfully',
                token,
                user: { id: user.id, name: user.name, email: user.email, role: user.role }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during login' });
        }
    }
};

module.exports = authController;
