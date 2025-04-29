// Import protection library
const csrf = require('csrf');
// Create a new instance of the CSRF token generator/verifier
const tokens = new csrf();

// Export middleware functions for use in other parts of the application
module.exports = {
  // Middleware function for CSRF protection
  csrfProtection: (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('CSRF.MIDDLEWARE.JS - csrfProtection start');
    }

    // Initialize session object
    if (!req.session) req.session = {};

    // Generate and store a CSRF secret in the session if one doesn't exist
    if (!req.session.csrfSecret) {
        // Generate a new secret key
        req.session.csrfSecret = tokens.secretSync();
        // Save the session to persist the CSRF secret
        req.session.save();
    }

    // Skip CSRF token validation for GET requests as they shouldn't modify state
    if (req.method === 'GET') return next();

    // For non-GET requests, get the CSRF token from the request headers
    const token = req.headers['x-csrf-token'];

    // Verify the submitted token against the session's secret
    if (!tokens.verify(req.session.csrfSecret, token)) {
      // If verification fails
      return res.status(403).json({
        error: 'Invalid CSRF token',
        code: 'INVALID_CSRF'
      });
    }

    next();
  }
};