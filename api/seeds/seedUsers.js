// Import mongoose lib
const mongoose = require(`mongoose`);
// Import bcrypt lib
const bcrypt = require('bcrypt');

// Require environment variables
const dotenv = require("dotenv");
dotenv.config();

// Get the MongoDB connection string from environment variables
const mongoDb = process.env.MONGO_DB;

// Require the Product model
const User = require(`../models/user.model`);

// Create an array of seed users documents
const users = [
    {
        name: "Client Profile",
        email: "client",
        password: "123456",
        role: "client"
    },
    {
        name: "Diego Pérez",
        email: "diego",
        password: "123456",
        role: "employee"
    }
];
(async () => {
    try {
        await mongoose.connect(mongoDb);

        // Clear existing users
        const existingUsers = await User.find();
        if (existingUsers.length) {
            await User.collection.drop();
        }

        // Create users with hashed passwords
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await User.create({
                name: user.name,
                email: user.email,
                password: hashedPassword,
                role: user.role
            });
            console.log(`User ${user.email} created`);
        }

        console.log('Database seeded successfully');
    } catch (err) {
        console.error(`Error: ${err}`);
    } finally {
        mongoose.disconnect();
    }
})();