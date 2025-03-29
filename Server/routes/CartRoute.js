const express = require('express');
const router = express.Router();
const CartItem = require('../models/Cart');

// Get all cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { name, price, imageUrl, quantity, productId } = req.body;
    
    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({ productId });
    
    if (existingItem) {
      // Update quantity if item already exists
      existingItem.quantity += quantity;
      await existingItem.save();
      res.json(existingItem);
    } else {
      // Create new cart item
      const newCartItem = new CartItem({
        name,
        price,
        imageUrl,
        quantity,
        productId
      });
      
      await newCartItem.save();
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Update cart item quantity - Standard RESTful endpoint
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Remove item from cart - Standard RESTful endpoint
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

module.exports = router;