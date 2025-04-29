// Import Express framework for routing
const express = require('express');
// Create router instance to define authentication routes
const router = express.Router();
// Import JWT lib
const jwt = require("jsonwebtoken");
// Import bcrypt lib
const bcrypt = require("bcrypt");

// Import User model for interacting with the MongoDB users collection
const userSchema = require("../models/user.model");
// Import authorization middleware to protect routes
const authorize = require("../utils/middlewares/auth.middleware.js");
// Import role groups to authorie routes
const { groupAdmin, groupEditors, groupClients } = require('../utils/middlewares/role.middleware');

// Import express-validator for validating request data
const { check, validationResult } = require('express-validator');

// SIGNUP
router.post("/signup",
    [
        // Validate user input fields
        check('name', 'Name minimum length 3 characters.')
            .not()
            .isEmpty()
            .isLength({ min: 3 }),
        check('email', 'Email must be unique and minimum length 3 characters.')
            .not()
            .isEmpty()
            .isLength({ min: 3 }),
        check('password', 'Password minimum length 5 characters.')
            .not()
            .isEmpty()
            .isLength({ min: 5}),
        check('role', 'Must be either employee or client')
            .not()
            .isEmpty()
    ],
    async (req, res, next) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('USER.ROUTES.JS - /signup start')
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If validation errors exist, return 422 status with errors
            return res.status(422).json(errors.array());
        }
        try {
            // Check if the email already exists
            const existingUser = await userSchema.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(409).json({ message: "ERROR: Email already exists." });
            }
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new userSchema({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role,
            });
            // Save the user and return success response
            const createdUser = await user.save();
            res.status(201).json({
                message: "SUCCESS: User created successfully.",
                result: createdUser
            });
        } catch (error) {
            // Handle any errors that occur during user creation
            res.status(500).json({ error: error.message });
        }
    }
);


// SIGNIN
router.post("/signin", async (req, res, next) => {
    try {
        if (process.env.NODE_ENV === 'development') {
            console.log('USER.ROUTES.JS - /signin start')
        }
        // Fetch user by email
        const user = await userSchema.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "ERROR: User doesn't exist." });
        }
        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "ERROR: Password incorrect." });
        }
        // Generate JWT token
        const jwtToken = jwt.sign(
            {
                email: user.email,
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );
        // Return token and user ID
        res.status(200).json({
            message: "SUCCESS: User signin successfully.",
            token: jwtToken,
            _id: user._id,
            role: user.role,
            expiresIn: 14400000
        });
    } catch (err) {
        // Handle any errors that occur during sign-in
        return res.status(401).json({ message: "ERROR: Authentication failed." });
    }
});


// GET ALL -  Users
router.get('/', authorize, groupEditors, async (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('USER.ROUTES.JS - / (all users) start')
    }
    try {
        if(req.user.role) {
            // Fetch all users from the database
            const users = await userSchema.find();
            res.status(200).json(users);
        }
    } catch (error) {
        // Forward any errors to the global error handler
        next(error);
    }
});


// GET BY ID - User by ID
router.get('/user/:id', authorize, async (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('USER.ROUTES.JS - /user/:id start')
    }
    try {
        // Find user by ID
        const user = await userSchema.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "ERROR: User not found." });
        }
        // Return the found user as JSON
        res.status(200).json(user);
    } catch (error) {
        // Forward any errors to the global error handler
        return next(error);
    }
});

// GET BY NAME - User
router.get('/user/name/:name', authorize, groupEditors, async (req, res, next) => {
    try {
        if (process.env.NODE_ENV === 'development') {
            console.log('USER.ROUTES.JS - /user/name/:name start')
        }
        const email = req.params.name;
        // Use the 'find' method with a regular expression to search for users containing the name
        const users = await userSchema.find({ name: { $regex: email, $options: 'i' } });
        // If no users are found, return a 404 response
        if (users.length === 0) {
            return res.status(404).json({ message: "ERROR: No users found" });
        }
        // Return the found users as JSON
        res.status(200).json(users);
    } catch (error) {
        // Forward any errors to the global error handler
        return next(error);
    }
});

// UPDATE User by ID
router.put('/edit/:id', authorize, groupEditors, async (req, res, next) => {
    try {
        if (process.env.NODE_ENV === 'development') {
            console.log('USER.ROUTES.JS - /user/edit/:id start')
        }
        // Fetch the current user data
        const currentUser = await userSchema.findById(req.params.id);
        if (!currentUser) {
            return res.status(404).json({ message: "ERROR: User not found when fetching current user data." });
        }
        // Only include email if it has changed
        if (req.body.email && req.body.email === currentUser.email) {
            delete req.body.email;
        }
        // Only update the password if it's provided (non-empty string)
        if (req.body.password === '') {
            delete req.body.password;
        } else if (req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash; // Set the hashed password back to the request body
        }
        // Update user details
        const updatedUser = await userSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "ERROR: User not found." });
        }
        // Return the updated user as JSON
        res.status(200).json({
            message: "SUCCESS: User updated successfully.",
            result: updatedUser
        });
    } catch (error) {
        // Handle duplicate key error for unique fields
        if (error.code === 11000) {
            return res.status(400).json({ message: 'ERROR: Email address already in use.' });
        }
        // Forward any errors to the global error handler
        return next(error);
    }
});


// Delete User by ID
router.delete('/delete/:id', authorize, groupEditors, async (req, res, next) => {
    try {
        if (process.env.NODE_ENV === 'development') {
            console.log('USER.ROUTES.JS - /user/delete/:id start')
        }
        // Find and delete the user by ID
        const deletedUser = await userSchema.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "ERROR: User not found." });
        }
        // Return the deleted user as JSON
        res.status(200).json({
            message: "SUCCESS: User deleted successfully.",
            result: deletedUser
        });
    } catch (error) {
        // Forward any errors to the global error handler
        return next(error);
    }
});

module.exports = router;