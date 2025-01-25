// Import Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Use Mongoose Schema class to define the structure of our documents
const Schema = mongoose.Schema;

// Define the schema for products (structure of product documents)
let productSchema = new Schema({
    name: {
        // Allow both String and Object types for localized content
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (value) {
                // Validate that the value is either a string or an object
                return typeof value === 'string' || (typeof value === 'object' && value !== null && !Array.isArray(value));
            },
            message: 'Name must be either a string or an object for localized content.'
        }
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        // Allow both String and Object types for localized content
        type: mongoose.Schema.Types.Mixed,
        required: false,
        validate: {
            validator: function (value) {
                // Validate that the value is either a string or an object
                return typeof value === 'string' || (typeof value === 'object' && value !== null && !Array.isArray(value));
            },
            message: 'Description must be either a string or an object for localized content.'
        }
    },
    category: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: false
    },
    image: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    vegetarian: {
        type: Boolean,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
}, {
    // Automatically add and update 'lastUpdated' field
    timestamps: { updatedAt: 'lastUpdated' },
    // Name of the collection in MongoDB where these documents will be stored
    collection: 'products'
});

// Export the model to use it in other parts of the application
module.exports = mongoose.model('Product', productSchema);
