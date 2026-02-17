const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
  quantity: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

// Index for faster queries
cartSchema.index({ userId: 1, productId: 1 });

module.exports = mongoose.model('Cart', cartSchema);
