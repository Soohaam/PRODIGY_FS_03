const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addItem = async (req, res) => {
  const { productName, quantity } = req.body;

  try {
    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [
          {
            productName: product.name,
            quantity,
            price: product.price,
            image: product.image
          }
        ]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productName === productName);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productName: product.name,
          quantity,
          price: product.price,
          image: product.image
        });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.removeItem = async (req, res) => {
  const { productName } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productName !== productName);

    if (cart.items.length === 0) {
      await Cart.deleteOne({ _id: cart._id });
      return res.json({ message: 'Cart is empty and has been deleted' });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
