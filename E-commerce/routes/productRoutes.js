const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/products', authMiddleware, productController.createProduct);

router.get('/products', productController.getAllProducts);

router.get('/products/:id', productController.getProductById);

router.put('/products/:id', authMiddleware, productController.updateProduct);

router.delete('/products/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
