// Require library mongoose
const mongoose = require(`mongoose`);

// Require environment variables
const dotenv = require("dotenv");
dotenv.config(); // Load .env variables into process.env

// Get the MongoDB connection string from environment variables
const mongoDb = process.env.MONGO_DB;

// Require the Product model
const User = require(`../models/user.model`);

// Create an array of seed product documents
const users = [
    {
        name: "Seed user",
        username: "seeduser@diegoperez.es",
        password: "passwordHashed",
        role: "client"
    },
    {
        name: "Diego Pérez",
        username: "diego",
        password: "12345678",
        role: "employee"
    }
];

// Create Product documents from the products array
const userDocuments = users.map(user => new User(user));

// Set mongoose options for queries
mongoose.set('strictQuery', true);

// Main function to seed the database
(async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoDb);

        // Check if there are existing users in the database
        const allUser = await User.find();
        if (allUser.length) {
            // If products exist, drop the collection
            await User.collection.drop();
        }

        // Insert the new product documents into the database
        await User.insertMany(userDocuments);
        console.log('Database Created'); // Log a success message
    } catch (err) {
        console.error(`Error: ${err}`); // Log any errors that occur
    } finally {
        mongoose.disconnect(); // Disconnect from the database after operations are complete
    }
})();