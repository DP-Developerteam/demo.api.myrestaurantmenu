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
        name: {
            en: "Avocado Toast",
            es: "Tostada de Aguacate",
            de: "Avocado-Toast"
        },
        price: 7,
        description: {
            en: "Whole-grain toast with avocado, cherry tomatoes, and a drizzle of olive oil.",
            es: "Tostada integral con aguacate, tomates cherry y un chorrito de aceite de oliva.",
            de: "Vollkorntoast mit Avocado, Kirschtomaten und einem Schuss Olivenöl."
        },
        category: "breakfast",
        ingredients: ["Whole-grain bread", "Avocado", "Cherry tomatoes", "Olive oil", "Salt"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Bacon & Eggs Platter",
            es: "Plato de Bacon y Huevos",
            de: "Speck und Eier Platte"
        },
        price: 8,
        description: {
            en: "A classic breakfast plate with crispy bacon, sunny-side-up eggs, and toast.",
            es: "Un clásico desayuno con bacon crujiente, huevos fritos y tostadas.",
            de: "Ein klassisches Frühstück mit knusprigem Speck, Spiegeleiern und Toast."
        },
        category: "breakfast",
        ingredients: ["Bacon", "Eggs", "Toast", "Butter"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Vegetable Omelette",
            es: "Tortilla de Verduras",
            de: "Gemüseomelett"
        },
        price: 8,
        description: {
            en: "Delicious omelette made with mushrooms, spinach, and cheese.",
            es: "Deliciosa tortilla hecha con champiñones, espinacas y queso.",
            de: "Leckeres Omelett mit Pilzen, Spinat und Käse."
        },
        category: "breakfast",
        ingredients: ["Eggs", "Mushrooms", "Spinach", "Cheese"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Pancakes with Honey",
            es: "Tortitas con Miel",
            de: "Pfannkuchen mit Honig"
        },
        price: 6,
        description: {
            en: "Fluffy pancakes served with honey and fresh fruits.",
            es: "Tortitas esponjosas servidas con miel y frutas frescas.",
            de: "Fluffige Pfannkuchen mit Honig und frischen Früchten."
        },
        category: "breakfast",
        ingredients: ["Flour", "Eggs", "Milk", "Honey", "Fresh fruits"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Yogurt with Granola",
            es: "Yogur con Granola",
            de: "Joghurt mit Granola"
        },
        price: 4,
        description: {
            en: "Natural yogurt with crunchy granola and seasonal fruits.",
            es: "Yogur natural con granola crujiente y frutas de temporada.",
            de: "Naturjoghurt mit knuspriger Granola und saisonalen Früchten."
        },
        category: "breakfast",
        ingredients: ["Yogurt", "Granola", "Seasonal fruits"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Eggs Benedict",
            es: "Huevos Benedict",
            de: "Eier Benedikt"
        },
        price: 12,
        description: {
            en: "Poached eggs on toasted English muffins with ham and creamy hollandaise sauce.",
            es: "Huevos escalfados sobre muffins ingleses tostados con jamón y salsa holandesa.",
            de: "Pochierte Eier auf gerösteten englischen Muffins mit Schinken und holländischer Sauce."
        },
        category: "brunch",
        ingredients: ["Eggs", "English muffin", "Ham", "Hollandaise sauce"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Avocado and Feta Salad",
            es: "Ensalada de Aguacate y Queso Feta",
            de: "Avocado-Feta-Salat"
        },
        price: 10,
        description: {
            en: "Fresh avocado slices served with crumbled feta cheese, cherry tomatoes, and arugula.",
            es: "Rodajas de aguacate fresco servidas con queso feta desmenuzado, tomates cherry y rúcula.",
            de: "Frische Avocadoscheiben mit zerbröckeltem Fetakäse, Kirschtomaten und Rucola."
        },
        category: "brunch",
        ingredients: ["Avocado", "Feta cheese", "Cherry tomatoes", "Arugula", "Olive oil"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Chicken and Waffles",
            es: "Pollo y Waffles",
            de: "Hühnchen und Waffeln"
        },
        price: 14,
        description: {
            en: "Crispy fried chicken served with fluffy waffles and maple syrup.",
            es: "Pollo frito crujiente servido con waffles esponjosos y jarabe de arce.",
            de: "Knuspriges Brathähnchen mit fluffigen Waffeln und Ahornsirup."
        },
        category: "brunch",
        ingredients: ["Chicken", "Waffles", "Maple syrup", "Butter"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Spinach and Goat Cheese Quiche",
            es: "Quiche de Espinacas y Queso de Cabra",
            de: "Spinat-Ziegenkäse-Quiche"
        },
        price: 9,
        description: {
            en: "Savory quiche filled with fresh spinach, goat cheese, and a flaky crust.",
            es: "Quiche salada rellena de espinacas frescas, queso de cabra y una corteza crujiente.",
            de: "Herzhafte Quiche gefüllt mit frischem Spinat, Ziegenkäse und einer blättrigen Kruste."
        },
        category: "brunch",
        ingredients: ["Spinach", "Goat cheese", "Eggs", "Cream", "Pie crust"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Shrimp Avocado Toast",
            es: "Tostada de Aguacate y Camarones",
            de: "Garnelen-Avocado-Toast"
        },
        price: 13,
        description: {
            en: "Sourdough toast topped with shrimp, smashed avocado, and a sprinkle of chili flakes.",
            es: "Tostada de masa madre con camarones, aguacate triturado y un toque de hojuelas de chile.",
            de: "Sauerteigtoast mit Garnelen, zerdrückter Avocado und einer Prise Chiliflocken."
        },
        category: "brunch",
        ingredients: ["Sourdough bread", "Shrimp", "Avocado", "Chili flakes", "Lemon juice"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Grilled Salmon",
            es: "Salmón a la Parrilla",
            de: "Gegrillter Lachs"
        },
        price: 18,
        description: {
            en: "Fresh salmon fillet grilled to perfection, served with a side of lemon butter sauce.",
            es: "Filete de salmón fresco a la parrilla, servido con una salsa de mantequilla y limón.",
            de: "Frischer Lachsfilet perfekt gegrillt, serviert mit einer Zitronenbuttersauce."
        },
        category: "dinner",
        ingredients: ["Salmon", "Lemon", "Butter", "Garlic", "Parsley"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Eggplant Parmesan",
            es: "Berenjena a la Parmesana",
            de: "Auberginen-Parmesan"
        },
        price: 14,
        description: {
            en: "Layers of breaded eggplant, marinara sauce, and melted mozzarella cheese.",
            es: "Capas de berenjena empanizada, salsa marinara y queso mozzarella derretido.",
            de: "Schichten von panierten Auberginen, Marinara-Sauce und geschmolzenem Mozzarella."
        },
        category: "dinner",
        ingredients: ["Eggplant", "Marinara sauce", "Mozzarella", "Parmesan cheese", "Breadcrumbs"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Steak with Garlic Mashed Potatoes",
            es: "Filete con Puré de Patatas al Ajo",
            de: "Steak mit Knoblauch-Kartoffelpüree"
        },
        price: 22,
        description: {
            en: "Juicy grilled steak served with creamy garlic mashed potatoes and sautéed vegetables.",
            es: "Jugoso filete a la parrilla servido con puré de patatas al ajo y verduras salteadas.",
            de: "Saftiges gegrilltes Steak mit cremigem Knoblauch-Kartoffelpüree und gebratenem Gemüse."
        },
        category: "dinner",
        ingredients: ["Steak", "Potatoes", "Garlic", "Butter", "Vegetables"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Vegetarian Stuffed Peppers",
            es: "Pimientos Rellenos Vegetarianos",
            de: "Vegetarische Gefüllte Paprika"
        },
        price: 15,
        description: {
            en: "Bell peppers stuffed with quinoa, black beans, and vegetables, topped with melted cheese.",
            es: "Pimientos rellenos de quinoa, frijoles negros y verduras, cubiertos con queso derretido.",
            de: "Paprika gefüllt mit Quinoa, schwarzen Bohnen und Gemüse, überbacken mit geschmolzenem Käse."
        },
        category: "dinner",
        ingredients: ["Bell peppers", "Quinoa", "Black beans", "Vegetables", "Cheese"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Garlic Butter Shrimp Pasta",
            es: "Pasta de Camarones con Mantequilla de Ajo",
            de: "Knoblauchbutter-Garnelen-Pasta"
        },
        price: 16,
        description: {
            en: "Spaghetti tossed in garlic butter sauce with shrimp, parsley, and a sprinkle of Parmesan.",
            es: "Espaguetis salteados en salsa de mantequilla de ajo con camarones, perejil y un toque de parmesano.",
            de: "Spaghetti in Knoblauchbuttersauce mit Garnelen, Petersilie und einer Prise Parmesan."
        },
        category: "dinner",
        ingredients: ["Spaghetti", "Shrimp", "Garlic", "Butter", "Parmesan cheese"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Grilled Chicken Caesar Salad",
            es: "Ensalada César con Pollo a la Parrilla",
            de: "Gegrillter Hühnchen-Caesar-Salat"
        },
        price: 12,
        description: {
            en: "Classic Caesar salad topped with grilled chicken breast and crispy croutons.",
            es: "Ensalada César clásica con pechuga de pollo a la parrilla y crujientes croutons.",
            de: "Klassischer Caesar-Salat mit gegrillter Hühnerbrust und knusprigen Croutons."
        },
        category: "lunch",
        ingredients: ["Chicken breast", "Romaine lettuce", "Caesar dressing", "Parmesan", "Croutons"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Vegetable Stir-Fry with Tofu",
            es: "Salteado de Verduras con Tofu",
            de: "Gemüsepfanne mit Tofu"
        },
        price: 10,
        description: {
            en: "A medley of fresh vegetables stir-fried with tofu in a savory soy sauce.",
            es: "Una mezcla de verduras frescas salteadas con tofu en una sabrosa salsa de soja.",
            de: "Eine Mischung aus frischem Gemüse und Tofu in einer würzigen Sojasauce gebraten."
        },
        category: "lunch",
        ingredients: ["Tofu", "Bell peppers", "Broccoli", "Carrots", "Soy sauce"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Turkey Club Sandwich",
            es: "Sándwich Club de Pavo",
            de: "Truthahn-Club-Sandwich"
        },
        price: 11,
        description: {
            en: "Triple-layer sandwich with turkey, bacon, lettuce, tomato, and mayonnaise.",
            es: "Sándwich de tres pisos con pavo, bacon, lechuga, tomate y mayonesa.",
            de: "Dreischichtiges Sandwich mit Truthahn, Speck, Salat, Tomate und Mayonnaise."
        },
        category: "lunch",
        ingredients: ["Turkey", "Bacon", "Lettuce", "Tomato", "Mayonnaise", "Bread"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Margherita Panini",
            es: "Panini Margarita",
            de: "Margherita-Panini"
        },
        price: 9,
        description: {
            en: "Toasted panini with fresh mozzarella, tomatoes, and basil pesto.",
            es: "Panini tostado con mozzarella fresca, tomates y pesto de albahaca.",
            de: "Getoastetes Panini mit frischem Mozzarella, Tomaten und Basilikumpesto."
        },
        category: "lunch",
        ingredients: ["Bread", "Mozzarella", "Tomato", "Basil pesto"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Beef Burrito Bowl",
            es: "Bol de Burrito de Carne",
            de: "Rindfleisch-Burrito-Bowl"
        },
        price: 13,
        description: {
            en: "A hearty bowl with seasoned beef, rice, black beans, and fresh salsa.",
            es: "Un bol abundante con carne sazonada, arroz, frijoles negros y salsa fresca.",
            de: "Eine herzhafte Schüssel mit gewürztem Rindfleisch, Reis, schwarzen Bohnen und frischer Salsa."
        },
        category: "lunch",
        ingredients: ["Beef", "Rice", "Black beans", "Salsa", "Avocado"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Loaded Nachos",
            es: "Nachos Cargados",
            de: "Beladene Nachos"
        },
        price: 8,
        description: {
            en: "Crispy tortilla chips topped with melted cheese, jalapeños, salsa, and sour cream.",
            es: "Totopos crujientes cubiertos con queso derretido, jalapeños, salsa y crema agria.",
            de: "Knusprige Tortilla-Chips mit geschmolzenem Käse, Jalapeños, Salsa und Sauerrahm."
        },
        category: "snack",
        ingredients: ["Tortilla chips", "Cheddar cheese", "Jalapeños", "Salsa", "Sour cream"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Chicken Wings",
            es: "Alitas de Pollo",
            de: "Hühnerflügel"
        },
        price: 10,
        description: {
            en: "Juicy chicken wings tossed in your choice of buffalo, BBQ, or honey mustard sauce.",
            es: "Jugosas alitas de pollo bañadas en salsa buffalo, BBQ o mostaza y miel.",
            de: "Saftige Hühnerflügel in Buffalo-, BBQ- oder Honig-Senf-Sauce."
        },
        category: "snack",
        ingredients: ["Chicken wings", "Buffalo sauce", "BBQ sauce", "Honey mustard"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Caprese Skewers",
            es: "Brochetas Caprese",
            de: "Caprese-Spieße"
        },
        price: 7,
        description: {
            en: "Mini skewers with cherry tomatoes, mozzarella balls, and fresh basil drizzled with balsamic glaze.",
            es: "Brochetas mini con tomates cherry, bolitas de mozzarella y albahaca fresca, rociadas con reducción de balsámico.",
            de: "Mini-Spieße mit Kirschtomaten, Mozzarella-Kugeln und frischem Basilikum, beträufelt mit Balsamico-Glasur."
        },
        category: "snack",
        ingredients: ["Cherry tomatoes", "Mozzarella", "Basil", "Balsamic glaze"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Mini Sliders",
            es: "Mini Hamburguesas",
            de: "Mini-Burger"
        },
        price: 12,
        description: {
            en: "Three mini burgers served with cheese, pickles, and a side of ketchup.",
            es: "Tres mini hamburguesas servidas con queso, pepinillos y una porción de kétchup.",
            de: "Drei Mini-Burger mit Käse, Gurken und einer Portion Ketchup."
        },
        category: "snack",
        ingredients: ["Beef patties", "Cheddar cheese", "Pickles", "Mini burger buns", "Ketchup"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Stuffed Mushroom Bites",
            es: "Bocaditos de Champiñones Rellenos",
            de: "Gefüllte Pilz-Häppchen"
        },
        price: 9,
        description: {
            en: "Bite-sized mushrooms stuffed with cream cheese, herbs, and breadcrumbs, baked to golden perfection.",
            es: "Champiñones pequeños rellenos de queso crema, hierbas y pan rallado, horneados hasta dorar.",
            de: "Kleine Pilze gefüllt mit Frischkäse, Kräutern und Paniermehl, goldbraun gebacken."
        },
        category: "snack",
        ingredients: ["Mushrooms", "Cream cheese", "Breadcrumbs", "Parsley", "Garlic"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Lemon Iced Tea",
            es: "Té Helado de Limón",
            de: "Eistee mit Zitrone"
        },
        price: 4,
        description: {
            en: "A refreshing blend of black tea with a zesty lemon twist, served chilled.",
            es: "Una refrescante mezcla de té negro con un toque de limón, servido frío.",
            de: "Eine erfrischende Mischung aus schwarzem Tee mit einer Zitronennote, serviert gekühlt."
        },
        category: "cold",
        ingredients: ["Black tea", "Lemon juice", "Ice", "Sugar"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Cold Brew Coffee",
            es: "Café Cold Brew",
            de: "Cold Brew Kaffee"
        },
        price: 5,
        description: {
            en: "Smooth and bold coffee brewed cold for an energizing experience.",
            es: "Café suave y fuerte preparado en frío para una experiencia energizante.",
            de: "Sanfter und kräftiger Kaffee, kalt gebrüht für ein belebendes Erlebnis."
        },
        category: "cold",
        ingredients: ["Coffee beans", "Water", "Ice"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Mint Lemonade",
            es: "Limonada de Menta",
            de: "Minzlimonade"
        },
        price: 4,
        description: {
            en: "Crisp lemonade infused with fresh mint leaves for a cooling taste.",
            es: "Refrescante limonada infusionada con hojas de menta fresca.",
            de: "Erfrischende Limonade mit frischen Minzblättern für einen kühlenden Geschmack."
        },
        category: "cold",
        ingredients: ["Lemon juice", "Mint leaves", "Sugar", "Ice", "Water"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Iced Chai Latte",
            es: "Chai Latte Helado",
            de: "Eis-Chai-Latte"
        },
        price: 5,
        description: {
            en: "Spiced chai tea mixed with milk and served over ice for a creamy treat.",
            es: "Té chai especiado mezclado con leche y servido con hielo para un cremoso placer.",
            de: "Gewürzter Chai-Tee mit Milch gemischt und über Eis serviert für ein cremiges Vergnügen."
        },
        category: "cold",
        ingredients: ["Chai tea", "Milk", "Ice", "Sugar"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Peach Iced Tea",
            es: "Té Helado de Melocotón",
            de: "Pfirsich-Eistee"
        },
        price: 4,
        description: {
            en: "Sweet and fruity iced tea infused with natural peach flavors.",
            es: "Té helado dulce y afrutado infusionado con sabores naturales de melocotón.",
            de: "Süßer und fruchtiger Eistee mit natürlichem Pfirsichgeschmack."
        },
        category: "cold",
        ingredients: ["Black tea", "Peach syrup", "Ice", "Sugar"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Espresso",
            es: "Espresso",
            de: "Espresso"
        },
        price: 3,
        description: {
            en: "A bold and rich shot of pure espresso for coffee enthusiasts.",
            es: "Un shot intenso y rico de espresso puro para los amantes del café.",
            de: "Ein kräftiger und reiner Espresso-Shot für Kaffeeliebhaber."
        },
        category: "hot",
        ingredients: ["Coffee beans", "Water"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Cappuccino",
            es: "Capuchino",
            de: "Cappuccino"
        },
        price: 4,
        description: {
            en: "A creamy delight with espresso, steamed milk, and a frothy milk topping.",
            es: "Una delicia cremosa con espresso, leche al vapor y una capa de espuma de leche.",
            de: "Ein cremiger Genuss mit Espresso, gedämpfter Milch und einer schaumigen Milchhaube."
        },
        category: "hot",
        ingredients: ["Coffee beans", "Milk"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Green Tea",
            es: "Té Verde",
            de: "Grüner Tee"
        },
        price: 3,
        description: {
            en: "Soothing and healthy green tea with a mild, refreshing flavor.",
            es: "Relajante y saludable té verde con un sabor suave y refrescante.",
            de: "Beruhigender und gesunder grüner Tee mit einem milden, erfrischenden Geschmack."
        },
        category: "hot",
        ingredients: ["Green tea leaves", "Water"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Hot Chocolate",
            es: "Chocolate Caliente",
            de: "Heiße Schokolade"
        },
        price: 4,
        description: {
            en: "Rich and indulgent hot chocolate made with creamy milk and cocoa.",
            es: "Chocolate caliente rico y cremoso hecho con leche y cacao.",
            de: "Reichhaltige und cremige heiße Schokolade aus Milch und Kakao."
        },
        category: "hot",
        ingredients: ["Milk", "Cocoa powder", "Sugar"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Chamomile Tea",
            es: "Té de Manzanilla",
            de: "Kamillentee"
        },
        price: 3,
        description: {
            en: "Relaxing chamomile tea perfect for unwinding after a long day.",
            es: "Relajante té de manzanilla perfecto para relajarse después de un largo día.",
            de: "Beruhigender Kamillentee, perfekt zum Entspannen nach einem langen Tag."
        },
        category: "hot",
        ingredients: ["Chamomile flowers", "Water"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Orange Juice",
            es: "Zumo de Naranja",
            de: "Orangensaft"
        },
        price: 4,
        description: {
            en: "Freshly squeezed orange juice, packed with vitamin C.",
            es: "Zumo de naranja recién exprimido, lleno de vitamina C.",
            de: "Frisch gepresster Orangensaft, voller Vitamin C."
        },
        category: "fresh",
        ingredients: ["Oranges"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Tropical Smoothie",
            es: "Batido Tropical",
            de: "Tropischer Smoothie"
        },
        price: 5,
        description: {
            en: "A creamy smoothie with mango, pineapple, and a hint of coconut.",
            es: "Un batido cremoso con mango, piña y un toque de coco.",
            de: "Ein cremiger Smoothie mit Mango, Ananas und einer Note Kokos."
        },
        category: "fresh",
        ingredients: ["Mango", "Pineapple", "Coconut milk"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Strawberry Banana Shake",
            es: "Batido de Fresa y Plátano",
            de: "Erdbeer-Bananen-Shake"
        },
        price: 5,
        description: {
            en: "A sweet and refreshing shake made with strawberries and bananas.",
            es: "Un batido dulce y refrescante hecho con fresas y plátanos.",
            de: "Ein süßer und erfrischender Shake aus Erdbeeren und Bananen."
        },
        category: "fresh",
        ingredients: ["Strawberries", "Banana", "Milk"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Green Detox Juice",
            es: "Jugo Verde Detox",
            de: "Grüner Detox-Saft"
        },
        price: 6,
        description: {
            en: "A revitalizing mix of kale, green apple, and cucumber.",
            es: "Una mezcla revitalizante de kale, manzana verde y pepino.",
            de: "Eine belebende Mischung aus Grünkohl, grünem Apfel und Gurke."
        },
        category: "fresh",
        ingredients: ["Kale", "Green apple", "Cucumber"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Watermelon Cooler",
            es: "Refresco de Sandía",
            de: "Wassermelonen-Erfrischung"
        },
        price: 4,
        description: {
            en: "Chilled watermelon juice with a splash of lime for a refreshing drink.",
            es: "Jugo de sandía frío con un toque de lima para una bebida refrescante.",
            de: "Gekühlter Wassermelonensaft mit einem Spritzer Limette für ein erfrischendes Getränk."
        },
        category: "fresh",
        ingredients: ["Watermelon", "Lime"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Chardonnay",
            es: "Chardonnay",
            de: "Chardonnay"
        },
        price: 8,
        description: {
            en: "A crisp and refreshing white wine with hints of citrus and oak.",
            es: "Un vino blanco fresco y refrescante con toques de cítricos y roble.",
            de: "Ein frischer und erfrischender Weißwein mit Noten von Zitrus und Eiche."
        },
        category: "alcohol",
        ingredients: ["Grapes"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Cabernet Sauvignon",
            es: "Cabernet Sauvignon",
            de: "Cabernet Sauvignon"
        },
        price: 10,
        description: {
            en: "A bold and rich red wine with notes of blackcurrant and vanilla.",
            es: "Un vino tinto intenso y rico con notas de grosella negra y vainilla.",
            de: "Ein kräftiger und reicher Rotwein mit Noten von schwarzer Johannisbeere und Vanille."
        },
        category: "alcohol",
        ingredients: ["Grapes"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Pale Ale",
            es: "Pale Ale",
            de: "Pale Ale"
        },
        price: 6,
        description: {
            en: "A golden craft beer with a balanced hop and malt profile.",
            es: "Una cerveza artesanal dorada con un perfil equilibrado de lúpulo y malta.",
            de: "Ein goldenes Craft-Bier mit einem ausgewogenen Hopfen- und Malzprofil."
        },
        category: "alcohol",
        ingredients: ["Barley", "Hops", "Yeast", "Water"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Stout Beer",
            es: "Cerveza Stout",
            de: "Stout-Bier"
        },
        price: 7,
        description: {
            en: "A dark and creamy beer with rich flavors of coffee and chocolate.",
            es: "Una cerveza oscura y cremosa con ricos sabores a café y chocolate.",
            de: "Ein dunkles und cremiges Bier mit reichen Aromen von Kaffee und Schokolade."
        },
        category: "alcohol",
        ingredients: ["Barley", "Hops", "Yeast", "Water"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Rosé Wine",
            es: "Vino Rosado",
            de: "Roséwein"
        },
        price: 9,
        description: {
            en: "A delicate and aromatic rosé with notes of strawberry and peach.",
            es: "Un rosado delicado y aromático con notas de fresa y melocotón.",
            de: "Ein zarter und aromatischer Rosé mit Noten von Erdbeere und Pfirsich."
        },
        category: "alcohol",
        ingredients: ["Grapes"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Mojito",
            es: "Mojito",
            de: "Mojito"
        },
        price: 9,
        description: {
            en: "A refreshing blend of white rum, fresh mint leaves, lime juice, sugar, and sparkling water.",
            es: "Una refrescante mezcla de ron blanco, hojas de menta fresca, jugo de limón, azúcar y agua con gas.",
            de: "Eine erfrischende Mischung aus weißem Rum, frischen Minzblättern, Limettensaft, Zucker und Sprudelwasser."
        },
        category: "cocktail",
        ingredients: ["White Rum", "Mint Leaves", "Lime Juice", "Sugar", "Sparkling Water"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Margarita",
            es: "Margarita",
            de: "Margarita"
        },
        price: 10,
        description: {
            en: "A classic cocktail made with tequila, lime juice, and triple sec, served with a salted rim.",
            es: "Un cóctel clásico hecho con tequila, jugo de limón y triple sec, servido con un borde de sal.",
            de: "Ein klassischer Cocktail aus Tequila, Limettensaft und Triple Sec, serviert mit einem Salzrand."
        },
        category: "cocktail",
        ingredients: ["Tequila", "Lime Juice", "Triple Sec", "Salt"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Old Fashioned",
            es: "Old Fashioned",
            de: "Old Fashioned"
        },
        price: 12,
        description: {
            en: "A timeless mix of bourbon, sugar, bitters, and a twist of orange peel.",
            es: "Una mezcla atemporal de bourbon, azúcar, amargos y una cáscara de naranja.",
            de: "Eine zeitlose Mischung aus Bourbon, Zucker, Bitter und einer Orangenschale."
        },
        category: "cocktail",
        ingredients: ["Bourbon", "Sugar", "Bitters", "Orange Peel"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Piña Colada",
            es: "Piña Colada",
            de: "Piña Colada"
        },
        price: 11,
        description: {
            en: "A tropical blend of rum, coconut cream, and pineapple juice, served chilled.",
            es: "Una mezcla tropical de ron, crema de coco y jugo de piña, servida fría.",
            de: "Eine tropische Mischung aus Rum, Kokoscreme und Ananassaft, serviert gekühlt."
        },
        category: "cocktail",
        ingredients: ["Rum", "Coconut Cream", "Pineapple Juice"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Espresso Martini",
            es: "Martini de Espresso",
            de: "Espresso Martini"
        },
        price: 13,
        description: {
            en: "A modern favorite combining vodka, espresso, coffee liqueur, and a touch of sugar.",
            es: "Un favorito moderno que combina vodka, espresso, licor de café y un toque de azúcar.",
            de: "Ein moderner Favorit, der Wodka, Espresso, Kaffeelikör und eine Prise Zucker kombiniert."
        },
        category: "cocktail",
        ingredients: ["Vodka", "Espresso", "Coffee Liqueur", "Sugar"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Margherita Pizza",
            es: "Pizza Margarita",
            de: "Margherita-Pizza"
        },
        price: 10,
        description: {
            en: "Classic Italian pizza with simple and fresh ingredients.",
            es: "Pizza italiana clásica con ingredientes simples y frescos.",
            de: "Klassische italienische Pizza mit einfachen und frischen Zutaten."
        },
        category: "Pizzas",
        ingredients: ["Flour", "Tomato", "Mozzarella", "Basil"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Pepperoni Pizza",
            es: "Pizza de Pepperoni",
            de: "Pepperoni-Pizza"
        },
        price: 12,
        description: {
            en: "A delicious pizza topped with pepperoni and cheese.",
            es: "Una deliciosa pizza cubierta con pepperoni y queso.",
            de: "Eine leckere Pizza mit Pepperoni und Käse."
        },
        category: "Pizzas",
        ingredients: ["Flour", "Tomato", "Mozzarella", "Pepperoni"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Quattro Formaggi Pizza",
            es: "Pizza Quattro Formaggi",
            de: "Quattro Formaggi Pizza"
        },
        price: 13,
        description: {
            en: "A rich and cheesy pizza made with four types of cheese.",
            es: "Una pizza rica y quesosa hecha con cuatro tipos de queso.",
            de: "Eine reichhaltige und käsige Pizza mit vier Käsesorten."
        },
        category: "Pizzas",
        ingredients: ["Flour", "Tomato", "Mozzarella", "Parmesan", "Gorgonzola", "Fontina"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Diavola Pizza",
            es: "Pizza Diavola",
            de: "Diavola Pizza"
        },
        price: 14,
        description: {
            en: "Spicy pizza topped with salami for an extra kick.",
            es: "Pizza picante cubierta con salami para un toque extra.",
            de: "Scharfe Pizza mit Salami für einen extra Kick."
        },
        category: "Pizzas",
        ingredients: ["Flour", "Tomato", "Mozzarella", "Spicy salami"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Capricciosa Pizza",
            es: "Pizza Capricciosa",
            de: "Capricciosa Pizza"
        },
        price: 13,
        description: {
            en: "Loaded with ham, mushrooms, and artichokes.",
            es: "Cargada con jamón, champiñones y alcachofas.",
            de: "Beladen mit Schinken, Pilzen und Artischocken."
        },
        category: "Pizzas",
        ingredients: ["Flour", "Tomato", "Mozzarella", "Ham", "Mushrooms", "Artichokes", "Olives"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: false
    },
    {
        name: {
            en: "Vegetarian Pizza",
            es: "Pizza Vegetariana",
            de: "Vegetarische Pizza"
        },
        price: 9,
        description: {
            en: "A fresh and healthy vegetarian pizza with mixed vegetables.",
            es: "Una pizza vegetariana fresca y saludable con verduras mixtas.",
            de: "Eine frische und gesunde vegetarische Pizza mit gemischtem Gemüse."
        },
        category: "Pizzas",
        ingredients: ["Flour", "Tomato", "Mozzarella", "Mixed vegetables"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Sparkling Water",
            es: "Agua con Gas",
            de: "Sprudelwasser"
        },
        price: 3,
        description: {
            en: "Refreshing sparkling water to quench your thirst.",
            es: "Refrescante agua con gas para saciar tu sed.",
            de: "Erfrischendes Sprudelwasser, um den Durst zu löschen."
        },
        category: "Beverages",
        ingredients: ["Water"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Coca-Cola",
            es: "Coca-Cola",
            de: "Coca-Cola"
        },
        price: 2,
        description: {
            en: "Classic Coca-Cola with a sweet and fizzy taste.",
            es: "Coca-Cola clásica con un sabor dulce y burbujeante.",
            de: "Klassische Coca-Cola mit einem süßen und sprudelnden Geschmack."
        },
        category: "Beverages",
        ingredients: ["Water", "Sugar", "Caffeine"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Orange Fanta",
            es: "Fanta Naranja",
            de: "Orange Fanta"
        },
        price: 2,
        description: {
            en: "Fruity and refreshing orange-flavored soft drink.",
            es: "Refrescante bebida gaseosa con sabor a naranja.",
            de: "Fruchtiges und erfrischendes Orangenlimonade."
        },
        category: "Beverages",
        ingredients: ["Water", "Sugar", "Orange flavor"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Sprite",
            es: "Sprite",
            de: "Sprite"
        },
        price: 2,
        description: {
            en: "Lemon-lime soda with a crisp, clean taste.",
            es: "Refresco de limón y lima con un sabor crujiente y limpio.",
            de: "Zitronenlimonade mit einem knackigen und klaren Geschmack."
        },
        category: "Beverages",
        ingredients: ["Water", "Sugar", "Lemon flavor"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Iced Tea",
            es: "Té Helado",
            de: "Eistee"
        },
        price: 3,
        description: {
            en: "Iced tea with a touch of lemon for a refreshing drink.",
            es: "Té helado con un toque de limón para una bebida refrescante.",
            de: "Eistee mit einem Hauch von Zitrone für ein erfrischendes Getränk."
        },
        category: "Beverages",
        ingredients: ["Tea", "Sugar", "Lemon"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
    },
    {
        name: {
            en: "Still Water",
            es: "Agua sin Gas",
            de: "Stilles Wasser"
        },
        price: 2,
        description: {
            en: "Pure, non-sparkling water for hydration.",
            es: "Agua pura sin gas para hidratarse.",
            de: "Reines, nicht sprudelndes Wasser zur Hydratation."
        },
        category: "Beverages",
        ingredients: ["Water"],
        image: "/img/freepik__candid-image-photography-natural-textures-highly-r__85082.jpeg",
        video: "add video later",
        vegetarian: true
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
