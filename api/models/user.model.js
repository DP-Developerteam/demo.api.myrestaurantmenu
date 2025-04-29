// Import Mongoose library for MongoDB interaction
const mongoose = require('mongoose');
// Use Mongoose Schema class to define the structure of our documents
const Schema = mongoose.Schema;

// Define the schema for users (structure of user documents)
let userSchema = new Schema({
    name: {
        // The name of the user
        type: String,
        required: true,
        minlength: 3 // Minimum length of 3 characters
    },
    email: {
        // The unique email for the user
        type: String,
        unique: true,
        minlength: 3, // Minimum length of 3 characters
        required: true
    },
    password: {
        // The hashed password of the user
        type: String,
        minlength: 5, // Minimum length of 5 characters
        sparse: true // Allows null for Google users
        // maxlength: 16 // Maximum length of 16 characters
    },
    role: {
        // The role of the user (either 'employee' or 'client')
        type: String,
        required: true,
        enum: ['employee', 'client'], // Allowed values for role
        default: 'client'
    },
    // Google OAuth fields
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows null for local users
    },
    displayName: String
}, {
    // Name of the collection in MongoDB where these documents will be stored
    collection: 'users'
});

// Pre-save hook to handle email/password for local users
userSchema.pre('save', function(next) {
    if (!this.googleId && (!this.email || !this.password)) {
        return next(new Error('Local users require email and password'));
    }
    next();
});

// Export the model to use it in other parts of the application
module.exports = mongoose.model('User', userSchema);
