const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const { optionalAuth } = require('../middleware/auth');

// Helper to get userId from request
const getUserId = (req) => {
  return req.user?.sub || 'guest';
};

// GET all wishlist items for user
router.get('/', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const wishlistItems = await Wishlist.find({ userId }).sort({ createdAt: -1 });
    res.json(wishlistItems);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// GET single wishlist item
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const wishlistItem = await Wishlist.findOne({ _id: req.params.id, userId });
    if (!wishlistItem) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }
    res.json(wishlistItem);
  } catch (error) {
    console.error('Error fetching wishlist item:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist item' });
  }
});

// POST add item to wishlist
router.post('/', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    
    // Check if item already exists in wishlist
    const existingItem = await Wishlist.findOne({
      userId,
      productId: req.body.productId || req.body.id,
    });

    if (existingItem) {
      return res.status(400).json({ error: 'Item already in wishlist' });
    }

    // Create new wishlist item
    const wishlistItem = new Wishlist({
      userId,
      productId: req.body.productId || req.body.id,
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      rating: req.body.rating,
    });

    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

// PUT update wishlist item
router.put('/:id', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const wishlistItem = await Wishlist.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!wishlistItem) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }
    res.json(wishlistItem);
  } catch (error) {
    console.error('Error updating wishlist item:', error);
    res.status(500).json({ error: 'Failed to update wishlist item' });
  }
});

// PATCH partial update wishlist item
router.patch('/:id', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const wishlistItem = await Wishlist.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!wishlistItem) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }
    res.json(wishlistItem);
  } catch (error) {
    console.error('Error updating wishlist item:', error);
    res.status(500).json({ error: 'Failed to update wishlist item' });
  }
});

// DELETE remove item from wishlist
router.delete('/:id', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const wishlistItem = await Wishlist.findOneAndDelete({ _id: req.params.id, userId });
    if (!wishlistItem) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }
    res.json(wishlistItem);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

// DELETE clear entire wishlist
router.delete('/', optionalAuth, async (req, res) => {
  try {
    const userId = getUserId(req);
    await Wishlist.deleteMany({ userId });
    res.json({ message: 'Wishlist cleared successfully' });
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    res.status(500).json({ error: 'Failed to clear wishlist' });
  }
});

module.exports = router;
