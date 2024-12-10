// Import Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Use Mongoose Schema class to define the structure of our documents
const Schema = mongoose.Schema;

// Define the schema for products (structure of product documents)
let productSchema = new Schema({
    name: {
        // The name of the product (e.g., "Margherita Pizza")
        type: String,
        required: true
    },
    price: {
        // The price of the product
        type: Number,
        required: true
    },
    description: {
        // A brief description of the product (e.g., ingredients, details)
        type: String,
        required: false
    },
    category: {
        // The category to which the product belongs (e.g., Pizza, Drinks)
        type: String,
        required: true
    },
    ingredients: {
        // An array of ingredients for the product (e.g., ["Cheese", "Tomato"])
        type: [String],
        required: false
    },
    image: {
        // A URL pointing to an image of the product
        type: String,
        required: false
    },
    video: {
        // A URL pointing to a video showcasing the product
        type: String,
        required: false
    },
    vegetarian: {
        // Boolean flag to indicate if the product is vegetarian
        type: Boolean,
        required: true
    },
    dateCreation: {
        // Automatically store the date when the product is added to the menu
        type: Date,
        default: Date.now // Automatically set to the current date
    }
}, {
    // Name of the collection in MongoDB where these documents will be stored
    collection: 'products'
});

// Export the model to use it in other parts of the application
module.exports = mongoose.model('Product', productSchema);
