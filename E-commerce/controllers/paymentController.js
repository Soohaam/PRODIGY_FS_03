const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.processPayment = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (req.body.amount !== totalPrice) {
      return res.status(400).json({ message: 'Payment amount does not match total price' });
    }

    const newOrder = new Order({
      user: req.user.id,
      items: cart.items,
      totalPrice,
      shippingAddress: req.body.shippingAddress,
    });

    await newOrder.save();
    await Cart.deleteOne({ _id: cart._id });

    res.status(201).json({ message: 'Payment successful, order placed', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};