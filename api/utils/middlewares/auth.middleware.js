// Import the jsonwebtoken library for handling JWTs
const jwt = require("jsonwebtoken");

// Middleware function to verify JWT and attach user info to the request object
module.exports = (req, res, next) => {
    try {
        if (process.env.NODE_ENV === 'development') {
            console.log('AUTH.MIDDLEWARE.JS - Verify JWT middleware start')
        }
        // Check if the token has been provided
        const token = req.headers.authorization?.split(" ")[1];
        // Check authorized session authorized
        const sessionAuth = req.isAuthenticated();
        // Check for JWT-based auth
        if (token) {
            if (process.env.NODE_ENV === 'development') {
                console.log('AUTH.MIDDLEWARE.JS - JWT auth')
            }
            // Check if the token has expired
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach user info
            req.user = {
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            };
            return next();
        } else if (sessionAuth) { // Check for session-based auth (Google OAuth)
            if (process.env.NODE_ENV === 'development') {
                console.log('AUTH.MIDDLEWARE.JS - Session auth')
            }
            // Attach user info
            req.user = {
                userId: req.user._id,
                email: req.user.email,
                role: req.user.role
            };
            return next();
        } else {
            // If no token is provided, respond with a 401 Unauthorized status
            return res.status(401).json({
                message: "No token/session provided",
                code: "UNAUTHORIZED"
            });
        }

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // If token expired
            res.status(401).json({
                message: "Token expired",
                code: "TOKEN_EXPIRED"
            });
        } else {
            // If token verification fails
            res.status(401).json({
                message: "Invalid token/session",
                code: "INVALID_TOKEN"
            });
        }
    }
};
