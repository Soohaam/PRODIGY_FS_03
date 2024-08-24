const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const paymentController = require('../controllers/paymentController'); // Import payment controller
const authMiddleware = require('../middleware/authMiddleware');

router.post('/payment', authMiddleware, paymentController.processPayment);

router.get('/orders', authMiddleware, orderController.getUserOrders);

router.get('/orders/:id', authMiddleware, orderController.getOrderById);

router.put('/orders/:id/status', authMiddleware, orderController.updateOrderStatus);

module.exports = router;
