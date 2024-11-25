const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middleware/error.middleware");
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route')

const app = express();

app.use(helmet()); // Helps secure Express apps with various HTTP headers
/* 
Helmet does the following:
1. Prevents clickjacking attacks
2. Disables browser caching
3. Prevents XSS attacks
4. Prevents MIME type sniffing
5. Adds DNS prefetch control
6. Hides powered-by header
*/

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
/* 
Morgan logging formats:
1. 'dev': :method :url :status :response-time ms
2. 'combined': Standard Apache combined log output
3. 'common': Standard Apache common log output
4. 'short': Shorter than default
5. 'tiny': Minimal output
*/

app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/authentication',authRoutes );
// Welcome route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
        version: '1.0.0',
        environment: process.env.NODE_ENV
    });
});
// Error Handling
app.use(errorHandler);

module.exports = app;
