const jwt = require('jsonwebtoken');

const authMiddleware = {
    // Verifies the JWT token from the Authorization header
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ecommerce_secret_key_12345');
            req.user = decoded; // Attach user info { id, role } to the request object
            next(); // Move to the next middleware or controller
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
    },

    // Middleware to check if the authenticated user is an admin
    isAdmin: (req, res, next) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }
        next();
    }
};

module.exports = authMiddleware;
