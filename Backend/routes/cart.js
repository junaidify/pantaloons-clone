const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { optionalAuth } = require('../middleware/auth');

// Helper to get userId from request
const getUserId = (req) => {
  return req.user?.sub || 'guest';
};

// GET all cart items for user
router.get('/', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const cartItems = await Cart.find({ userId }).sort({ createdAt: -1 });
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// GET single cart item
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const cartItem = await Cart.findOne({ _id: req.params.id, userId });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(cartItem);
  } catch (error) {
    console.error('Error fetching cart item:', error);
    res.status(500).json({ error: 'Failed to fetch cart item' });
  }
});

// POST add item to cart
router.post('/', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    
    // Check if item already exists in cart
    const existingItem = await Cart.findOne({
      userId,
      productId: req.body.productId || req.body.id,
    });

    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity = (existingItem.quantity || 1) + 1;
      await existingItem.save();
      return res.json(existingItem);
    }

    // Create new cart item
    const cartItem = new Cart({
      userId,
      productId: req.body.productId || req.body.id,
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      quantity: req.body.quantity || 1,
    });

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// PUT update cart item
router.put('/:id', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const cartItem = await Cart.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(cartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// PATCH partial update cart item
router.patch('/:id', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const cartItem = await Cart.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(cartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// DELETE remove item from cart
router.delete('/:id', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, userId });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(cartItem);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

// DELETE clear entire cart
router.delete('/', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    await Cart.deleteMany({ userId });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;
