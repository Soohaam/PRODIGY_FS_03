const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');

router.post('/items', authMiddleware, cartController.addItem);

router.get('/items', authMiddleware, cartController.getCart);

router.delete('/cart/:productName', authMiddleware, cartController.removeItem);

module.exports = router;
