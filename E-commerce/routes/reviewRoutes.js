const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/reviews', authMiddleware, reviewController.addReview);

router.get('/reviews/:productId', reviewController.getProductReviews);

module.exports = router;
