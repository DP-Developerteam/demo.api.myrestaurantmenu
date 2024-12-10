// Import the jsonwebtoken library for handling JWTs
const jwt = require("jsonwebtoken");

// Middleware function to authorize access based on user role
module.exports = (req, res, next) => {
    try {
        // Extract the token from the Authorization header (format: "Bearer token")
        const token = req.headers.authorization?.split(" ")[1];

        // If no token is provided, respond with a 401 Unauthorized status
        if (!token) {
            return res.status(401).json({ message: "ERROR: Invalid token provided" });
        }

        // Retrieve the secret key from environment variables for token verification
        const secretKey = process.env.JWT_SECRET;

        // Verify the token using the secret key; this will decode the token if valid
        const decoded = jwt.verify(token, secretKey);

        // Check if the token has expired by comparing the expiration time to the current time
        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({ message: "ERROR: Token has expired" });
        }

        // Save user role
        const userRole = decoded.userRole;
        if (userRole === 'employee') {
            // User is an employee; allow access to the next middleware or route handler
            return next();
        }

    } catch (error) {
        // User is not an employee; respond with a 403 Forbidden status and a message
        return res.status(403).json({ message: "ERROR: Access forbidden." });
    }
};
