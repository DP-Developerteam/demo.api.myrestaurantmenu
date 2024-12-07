// Require library mongoose
const mongoose = require(`mongoose`);

// Require environment variables
const dotenv = require("dotenv");
dotenv.config(); // Load .env variables into process.env

// Get the MongoDB connection string from environment variables
const mongoDb = process.env.MONGO_DB;

// Require the Product model
const Product = require(`../models/product.model`);

// Create an array of seed product documents
const products = [
    {
        name: "Margarita",
        price: 10,
        description: "Classic Italian pizza with simple and fresh ingredients.",
        category: "Pizzas",
        ingredients: ["Harina de trigo", "Tomate", "Mozzarella", "Basílico"],
        image: "add image later",
        video: "add video later",
        vegetarian: true,
        dateAdded: new Date()
    },
    {
        name: "Pepperoni",
        price: 12,
        description: "A delicious pizza topped with pepperoni and cheese.",
        category: "Pizzas",
        ingredients: ["Harina de trigo", "Tomate", "Mozzarella", "Pepperoni"],
        image: "add image later",
        video: "add video later",
        vegetarian: false,
        dateAdded: new Date()
    },
    {
        name: "Quattro Formaggi",
        price: 13,
        description: "A rich and cheesy pizza made with four types of cheese.",
        category: "Pizzas",
        ingredients: ["Harina de trigo", "Tomate", "Mozzarella", "Parmesano", "Gorgonzola", "Fontina"],
        image: "add image later",
        video: "add video later",
        vegetarian: true,
        dateAdded: new Date()
    },
    {
        name: "Diavola",
        price: 14,
        description: "Spicy pizza topped with salami for an extra kick.",
        category: "Pizzas",
        ingredients: ["Harina de trigo", "Tomate", "Mozzarella", "Salami picante"],
        image: "add image later",
        video: "add video later",
        vegetarian: false,
        dateAdded: new Date()
    },
    {
        name: "Capricciosa",
        price: 13,
        description: "Loaded with ham, mushrooms, and artichokes.",
        category: "Pizzas",
        ingredients: ["Harina de trigo", "Tomate", "Mozzarella", "Jamón", "Champiñones", "Alcachofas", "Aceitunas"],
        image: "add image later",
        video: "add video later",
        vegetarian: false,
        dateAdded: new Date()
    },
    {
        name: "Pizza Vegetariana",
        price: 9,
        description: "A fresh and healthy vegetarian pizza with mixed vegetables.",
        category: "Pizzas",
        ingredients: ["Harina de trigo", "Tomate", "Mozzarella", "Verduras mixtas"],
        image: "add image later",
        video: "add video later",
        vegetarian: true,
        dateAdded: new Date()
    },
    {
        name: "Agua con gas",
        price: 3,
        description: "Refreshing sparkling water to quench your thirst.",
        category: "Bebidas",
        ingredients: ["Agua"],
        image: "add image later",
        video: "add video later",
        vegetarian: true,
        dateAdded: new Date()
    },
    {
        name: "Coca-Cola",
        price: 2,
        description: "Classic Coca-Cola with a sweet and fizzy taste.",
        category: "Bebidas",
        ingredients: ["Agua", "Azúcar", "Cafeína"],
        image: "add image later",
        video: "add video later",
        vegetarian: true,
        dateAdded: new Date()
    },
    {
        name: "Fanta Naranja",
        price: 2,
        description: "Fruity and refreshing orange-flavored soft drink.",
        category: "Bebidas",
        ingredients: ["Agua", "Azúcar", "Sabor a naranja"],
        image: "add image later",
        video: "add video later",
        vegetarian: true,
        dateAdded: new Date()
    },
    {
        name: "Sprite",
        price: 2,
        description: "Lemon-lime soda with a crisp, clean taste.",
        category: "Bebidas",
        ingredients: ["Agua", "Azúcar", "Sabor a limón"],
        image: "add image later",
        video: "add video later",
        vegetarian: true,
        dateAdded: new Date()
    },
    {
        name: "Té Helado",
        price: 3,
        description: "Iced tea with a touch of lemon for a refreshing drink.",
        category: "Bebidas",
        ingredients: ["Té", "Azúcar", "Limón"],
        image: "add image later",
        video: "add video later",
        vegetarian: true,
        dateAdded: new Date()
    },
    {
        name: "Agua sin gas",
        price: 2,
        description: "Pure, non-sparkling water for hydration.",
        category: "Bebidas",
        ingredients: ["Agua"],
        image: "add image later",
        video: "add video later",
        vegetarian: true,
        dateAdded: new Date()
    }

];

// Create Product documents from the products array
const productDocuments = products.map(product => new Product(product));

// Set mongoose options for queries
mongoose.set('strictQuery', true);

// Main function to seed the database
(async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoDb);

        // Check if there are existing products in the database
        const allProduct = await Product.find();
        if (allProduct.length) {
            // If products exist, drop the collection
            await Product.collection.drop();
        }

        // Insert the new product documents into the database
        await Product.insertMany(productDocuments);
        console.log('Database Created'); // Log a success message
    } catch (err) {
        console.error(`Error: ${err}`); // Log any errors that occur
    } finally {
        mongoose.disconnect(); // Disconnect from the database after operations are complete
    }
})();
