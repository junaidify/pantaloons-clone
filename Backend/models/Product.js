const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  features: {
    material: String,
    fit: String,
    size: String,
    color: String,
    sleeve_type: String,
    pattern: String,
    neck: String,
    length: String,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  rating: {
    type: Number,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
