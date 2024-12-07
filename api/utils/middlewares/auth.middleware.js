// Import the jsonwebtoken library for handling JWTs
const jwt = require("jsonwebtoken");

// Middleware function to verify JWT and attach user info to the request object
module.exports = (req, res, next) => {
    try {
        // Extract the token from the Authorization header (format: "Bearer token")
        const token = req.headers.authorization?.split(" ")[1];

        // If no token is provided, respond with a 401 Unauthorized status
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Retrieve the secret key from environment variables for token verification
        const secretKey = process.env.JWT_SECRET;

        // Verify the token using the secret key; this will decode the token if valid
        const decoded = jwt.verify(token, secretKey);

        // Check if the token has expired by comparing the expiration time to the current time
        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({ message: "Token has expired" });
        }

        // Attach user info (userId, username, role) to the request object for further use
        req.user = {
            userId: decoded.userId,
            username: decoded.username,
            role: decoded.role, // Include the user's role from the decoded token
        };

        // Call the next middleware in the stack
        next();
    } catch (error) {
        // If token verification fails, respond with a 401 Unauthorized status
        res.status(401).json({ message: "Invalid token provided" });
    }
};
