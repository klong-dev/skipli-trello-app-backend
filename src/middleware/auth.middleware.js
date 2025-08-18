// filepath: c:\Users\user\Desktop\WebStorm\SkipliBoardManagement\src\middleware\auth.middleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skipli-board-management-secret';

/**
 * Middleware to verify JWT token
 * Extracts token from Authorization header and validates it
 * If valid, adds the decoded user info to the request object
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Add user info to request
        next();
    } catch (error) {
        return res.status(403).json({message: 'Invalid token.'});
    }
};

module.exports = {
    verifyToken
};
