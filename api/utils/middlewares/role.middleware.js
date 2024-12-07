// Middleware function to authorize access based on user role
module.exports = (req, res, next) => {
    // Check if the user object exists on the request and if the user's role is 'employee'
    // This assumes the user object is added to the request by the authorize middleware
    if (req.user && req.user.role === 'employee') {
        // User is an employee; allow access to the next middleware or route handler
        return next();
    }

    // User is not an employee; respond with a 403 Forbidden status and a message
    return res.status(403).json({ message: "Access forbidden." });
};
