// Import dotenv to access environment variables
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();

// Import mongoose to communicate with the MongoDB database
const mongoose = require("mongoose");

// Store the MongoDB connection URL in a variable
const mongoDb = process.env.MONGO_DB;

// Check if the MONGO_DB environment variable is defined
if (!mongoDb) {
    throw new Error("MONGO_DB environment variable is not defined.");
}

// Define an asynchronous function to connect to the database
const connect = async () => {
    try {
        // Attempt to connect to the MongoDB database using mongoose
        const db = await mongoose.connect(mongoDb, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        // Destructure the database connection properties
        const { name, host } = db.connection;

        // Log the successful connection details
        console.log(`Connected to db: ${name}, on host: ${host}`);
    } catch (error) {
        // Log an error message if the connection fails
        console.error("Error connecting to the database:", error);
        // Exit the process if the connection fails
        process.exit(1);
    }
};

// Export the connect function
module.exports = { connect };
