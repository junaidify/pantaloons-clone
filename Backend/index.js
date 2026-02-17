require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const paymentRoutes = require("./routes/payment");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// API Routes
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/payment', paymentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error' 
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API endpoint: http://localhost:${port}`);
  console.log(`Products: http://localhost:${port}/products`);
  console.log(`Cart: http://localhost:${port}/cart`);
  console.log(`Wishlist: http://localhost:${port}/wishlist`);
  console.log(`Payment: http://localhost:${port}/payment`);
});
