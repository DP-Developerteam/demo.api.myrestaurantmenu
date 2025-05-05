// Import framework
const express = require('express');
// Middleware imports
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// Import security and protection
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Import configurations
const { connect } = require('./api/utils/database/connect.js');
require('./api/utils/passport.js');

// Import routes
const userRoutes = require('./api/routes/user.routes.js');
const productRoutes = require('./api/routes/product.routes.js');
const authRoutes = require('./api/routes/auth.routes.js');

// Express server initi
const app = express();

// Enviroment validation
if (!process.env.SESSION_SECRET || !process.env.MONGO_DB) {
    throw new Error('Missing critical environment variables');
}

// Proxy configuration
app.set('trust proxy', 2);

// Security middleware
// Rate limiting configuration for authentication endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minute window
    max: 50, // Max 50 requests per IP per window
    message: 'Too many attempts from this IP, please try again later'
});
// Apply rate limiting to sensitive routes
app.use('/users/signin', authLimiter);
app.use('/users/signup', authLimiter);

// Set secure HTTP headers using Helmet
app.use(helmet());

//Middleware requests
app.use(bodyParser.json()); // Parse JSON
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded

// CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.FRONT_CMS_URL,
            process.env.FRONT_BASE_URL
        ];
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    // exposedHeaders: [
    //     'Authorization', 'Set-Cookie'
    // ]
}));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret for signing session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    cookie: {
        path: '/',
        secure: true, // Set false for local test
        sameSite: 'none',
        httpOnly: true, // Prevent client-side JS cookie access
        maxAge: 4 * 60 * 60 * 1000 // 4 hour session duration
    },
    // MongoDB session store
    store: require('connect-mongo').create({
        mongoUrl: process.env.MONGO_DB
    })
}));

// Passport init
app.use(passport.initialize()); // Initialize Passport authentication
app.use(passport.session()); // Enable persistent sign in sessions

// Routes configuration
// Serve static files from public directory
app.use('/public', express.static('public'));
// API route mounting
app.use('/users', userRoutes); // User management routes
app.use('/products', productRoutes); // Product management routes
app.use('/auth', authRoutes); // Authentication routes

// Static assets
app.use(express.static(__dirname + '/public')); // Serve static files
app.get("/", (req, res) => { // Serve main HTML
    res.sendFile(__dirname + "/index.html");
});
app.use('/favicon.ico', express.static('public/favicon.ico')); // Serve favicon

// Error handling
app.use((err, req, res, next) => {
    console.error(err.message);
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production' // Hide detailed errors in production
        ? 'An error occurred'
        : err.message;
    res.status(statusCode).json({ message });
});

// Server start
const port = process.env.PORT || 4000;
const startServer = async () => {
    await connect(); // Establish database connection
    app.listen(port, () => console.log(`Server running on port ${port}`));
};
startServer();