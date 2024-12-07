// Import Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Use Mongoose Schema class to define the structure of our documents
const Schema = mongoose.Schema;

// Define the schema for users (structure of user documents)
let userSchema = new Schema({
    name: {
        // The name of the user (e.g., "John Doe")
        type: String,
        required: true,
        minlength: 3 // Minimum length of 3 characters
    },
    username: {
        // The unique username for the user (e.g., "john_doe")
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        minlength: 3 // Minimum length of 3 characters
    },
    password: {
        // The hashed password of the user
        type: String,
        required: true,
        minlength: 5, // Minimum length of 5 characters
        // maxlength: 16 // Maximum length of 16 characters
    },
    role: {
        // The role of the user (either 'employee' or 'client')
        type: String,
        required: true,
        enum: ['employee', 'client'], // Allowed values for role
        default: 'client'
    }
}, {
    // Name of the collection in MongoDB where these documents will be stored
    collection: 'users'
});

// Export the model to use it in other parts of the application
module.exports = mongoose.model('User', userSchema);
