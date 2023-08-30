"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.authenticateJwt = void 0;
const jwt = require('jsonwebtoken');
const SECRET = 'SECr3t'; // This should be in an environment variable in a real application
exports.SECRET = SECRET;
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.userId = user.id;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
