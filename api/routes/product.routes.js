// Import Express framework and create a new Router object
const express = require("express");
const router = express.Router();

// Import the Product model for interacting with the MongoDB products collection
const productSchema = require(`../models/product.model`);
// Import authorization middleware to protect routes
const authorize = require("../utils/middlewares/auth.middleware");


// GET ALL - Products
router.get('/', async (req, res, next) => {
    try {
        // Fetch all products from the database
        const products = await productSchema.find();
        // Return the fetched products as JSON
        res.status(200).json(products);
    } catch (error) {
        // Forward any errors to the global error handler
        next(error);
    }
});

// GET BY ID - Products
router.get('/product/:id', authorize, async (req, res, next) => {
    try {
        // Find the product by ID
        const product = await productSchema.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "SERVER: No products found" });
        }
        // Return the product as JSON
        res.status(200).json(product);
    } catch (error) {
        // Forward any errors to the global error handler
        next(error);
    }
});

// GET BY NAME - Products
router.get('/product/:name', authorize, async (req, res, next) => {
    try {
        const productName = req.params.name;

        // Use the 'find' method with a regular expression to search for products containing the name
        const products = await productSchema.find({ name: { $regex: productName, $options: 'i' } });

        // If no products are found, return a 404 response
        if (products.length === 0) {
            return res.status(404).json({ message: "SERVER: No products found" });
        }

        // Return the found products as JSON
        res.status(200).json(products);
    } catch (error) {
        // Forward any errors to the global error handler
        return next(error);
    }
});

// CREATE Product
router.post('/create', authorize, async (req, res, next) => {
    try {
        // Save the product
        const product = new productSchema({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            ingredients: req.body.ingredients,
            image: req.body.image,
            video: req.body.video,
            category: req.body.category,
            vegetarian: req.body.vegetarian,
            dateAdded: req.body.dateAdded
        });
        const createdProduct = await product.save();
        return res.status(201).json({
            message: "SUCCESS: Product created successfully.",
            result: createdProduct
        });
    } catch (err) {
        // Forward any errors to the global error handler
        return next(err);
    }
});

// UPDATE Product by ID
router.put('/edit/:id', authorize, async (req, res, next) => {
    try {
        // Update Product details
        const updatedProduct = await productSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "ERROR: Product not found." });
        }
        // Return the updated Product as JSON
        res.status(200).json({
            message: "SUCCESS: Product updated successfully.",
            result: updatedProduct
        });
    } catch (err) {
        // Forward any errors to the global error handler
        return next(err);
    }
});

// DELETE Product by ID
router.delete('/delete/:id', authorize, async (req, res, next) => {
    try {
        // Find and delete the Product by ID
        const deletedProduct = await productSchema.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Return the deleted product as JSON
        res.status(200).json({
            message: "SUCCESS: Product deleted successfully.",
            result: deletedProduct
        });
    } catch (err) {
        // Forward any errors to the global error handler
        return next(err);
    }
});



// Export the router to be used in the application
module.exports = router;