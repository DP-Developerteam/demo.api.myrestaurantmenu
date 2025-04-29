// Import Passport.js library for authentication
const passport = require('passport');
// Import Google OAuth 2.0 strategy for Passport
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Import User model for database operations
const User = require('../models/user.model.js');

// Configure Google OAuth strategy for Passport
passport.use(new GoogleStrategy({
        // Google OAuth client ID from environment variables
        clientID: process.env.GOOGLE_CLIENT_ID,
        // Google OAuth client secret from environment variables
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // Callback URL for Google to redirect after authentication
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        // Allow proxy to be used (important for production with HTTPS)
        proxy: true
    },
    // Async callback function that handles user authentication
    async (accessToken, refreshToken, profile, done) => {
        try {
            if (process.env.NODE_ENV === 'development') {
                console.log('PASSPORT.JS - Google OAuth Strategy start')
            }
            // Check if user exists in database by their Google ID
            let user = await User.findOne({ googleId: profile.id });
            // If user not found by Google ID, try finding by email
            if (!user) {
                user = await User.findOne({ email: profile.emails[0].value });
            }
            // If user doesn't exist at all, create a new user record
            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    role: 'client'
                });
            }
            // Authentication successful - pass user to Passport
            return done(null, user);
        } catch (error) {
            // Handle any errors during the authentication process
            return done(error, null);
        }
    }
));

// Serialize user for session storage
// Determines what user data gets stored in the session
passport.serializeUser((user, done) => {
    // Only store user ID in session for efficiency
    done(null, user.id);
});

// Deserialize user from session storage
// Retrieves full user data from database when needed
passport.deserializeUser(async (id, done) => {
    try {
        if (process.env.NODE_ENV === 'development') {
            console.log('PASSPORT.JS - Deserialize user start')
        }
        // Find user by ID stored in session
        const user = await User.findById(id);
        // Return user object
        done(null, user);
    } catch (error) {
        // Handle any errors during user retrieval
        done(error, null);
    }
});