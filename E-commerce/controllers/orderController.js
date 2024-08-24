const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const newOrder = new Order({
      user: req.user.id,
      items: cart.items,
      totalPrice: cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      shippingAddress: req.body.shippingAddress,
    });

    await newOrder.save();
    await Cart.deleteOne({ _id: cart._id });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.id });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.updateOrderStatus = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      order.status = req.body.status;
      order.updatedAt = Date.now();
      await order.save();
  
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
