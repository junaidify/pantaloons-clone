const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'guest',
  },
  productId: {
    type: String,
    required: true,
  },
  title: String,
  category: String,
  price: String,
  image: String,
  brand: String,
  rating: Number,
}, {
  timestamps: true,
});

// Index for faster queries
wishlistSchema.index({ userId: 1, productId: 1 });

module.exports = mongoose.model('Wishlist', wishlistSchema);
