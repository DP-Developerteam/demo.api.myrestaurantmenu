// Import Express framework for routing
const express = require('express');
// Create router instance to define authentication routes
const router = express.Router();
// Import Passport for authentication handling
const passport = require('passport');
// Import CSRF protection library
const csrf = require('csrf');
// Create new CSRF token instance
const tokens = new csrf();

// Session management
// Initialize session endpoint
router.get('/session-init', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('AUTH.ROUTES.JS - /session-init start')
  }
  // Initialize session if not already done
  if (!req.session.initialized) {
    req.session.initialized = true;
    // Persist session to store
    req.session.save(err => {
      if (err) console.error('Session init error:', err);
    });
  }
  // Return empty success response (204 No Content)
  res.sendStatus(204);
});

// Google OAuth routes
// Initiate Google OAuth authentication flow
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'] // Request user profile and email from Google
  })
);

// Google OAuth callback handler
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login', // Redirect on authentication failure
    successRedirect: process.env.FRONT_CMS_URL // Redirect on success
  })
);

// User management
// Fetch authenticated user data
router.get('/user', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('AUTH.ROUTES.JS - /user start')
  }
  // Check authentication status
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
  // Initialize session if doesn't exist
  if (!req.session) req.session = {};
  // Generate CSRF secret if missing
  if (!req.session.csrfSecret) {
    req.session.csrfSecret = tokens.secretSync();
    req.session.save();
  }
  // Create CSRF token for client-side usage
  const csrfToken = tokens.create(req.session.csrfSecret);
  // Return user data with CSRF token
  res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      csrfToken: csrfToken,
    }
  });
});

// Session termination - sign out
// Logout endpoint
router.post('/logout', (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('AUTH.ROUTES.JS - /logout start')
    }
    // Validate active session exists
    if (!req.session) {
      return res.status(400).json({
        error: 'No active session',
        code: 'NO_SESSION'
      });
    }
    const sessionId = req.sessionID;
    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        console.error(`Session destruction failed: ${sessionId}`, err);
        return res.status(500).json({
          error: 'Logout failed',
          code: 'LOGOUT_ERROR'
        });
      }
      // Clear session cookie with secure settings
      res.clearCookie('connect.sid', {
        // path: '/',
        // domain: process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL : 'localhost',
        // httpOnly: true, // Prevent client-side JS access
        // secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // CSRF protection
        path: '/',
        secure: true, // Set false for local test
        sameSite: 'none',
        domain: '.vercel.app',
        httpOnly: true, // Prevent client-side JS cookie access
      });
      // Return success response
      res.status(200).json({
        success: true,
        message: 'Sign out successfully'
      });
    });
  } catch (error) {
    console.error('Unexpected logout error:', error);
    res.status(500).json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Session validation
// Validate active sessions for all subsequent routes
router.use((req, res, next) => {
  if (req.user && req.session) {
    // Check if session has expired (15 minute threshold)
    if (Date.now() - req.session.cookie._expires > 900000) {
      req.logout(err => {
        if (err) console.error('Session expiration error:', err);
        return res.status(401).json({ error: 'Session expired' });
      });
      return;
    }
  }
  next();
});

// Export configured router
module.exports = router;