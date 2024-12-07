//Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Database connection
const { connect } = require('./api/utils/database/connect.js');

// Express APIs (Routes)
const user = require('./api/routes/user.routes.js');
const product = require('./api/routes/product.routes.js');

// Establish a connection to the database
connect();

// Initialize Express
const app = express();
app.use(bodyParser.json()); // Parse incoming JSON payloads
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded payloads
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Static files and route configuration
app.use('/public', express.static('public')); // Serve static files from the "public" directory
app.use('/users', user); // User-related API routes
app.use('/products', product); // Product-related API routes

// Serve the main HTML file (useful for deployment)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Serve static assets, such as CSS files
app.use(express.static(__dirname + '/public'));

// Serve the favicon
app.use('/favicon.ico', express.static('public/favicon.ico'));

// Start the server on the specified port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})


// Error handling
// Handle uncaught errors in middleware
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});
// Global error handler to send error responses
app.use(function (err, req, res, next) {
    console.error(err.message); // Log the error message
    if (!err.statusCode) err.statusCode = 500; // Default to internal server error (500)
    res.status(err.statusCode).send(err.message); // Send error response
});