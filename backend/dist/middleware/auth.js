import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { prisma } from '../config/prisma.js';
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Access denied. No token provided.' });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Malformed token profile.' });
            return;
        }
        const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'fallback_secret');
        const userExists = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!userExists) {
            res.status(401).json({ error: 'User session invalid.' });
            return;
        }
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Session token validation failed.' });
    }
};
export const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ error: 'Authentication required.' });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Forbidden. Elevated role parameters needed.' });
            return;
        }
        next();
    };
};
//# sourceMappingURL=auth.js.map