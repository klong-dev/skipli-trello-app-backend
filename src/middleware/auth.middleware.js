const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skipli-board-management-secret';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: 'Invalid token.'});
    }
};

module.exports = {
    verifyToken
};
