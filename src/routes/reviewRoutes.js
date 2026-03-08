import express from 'express';
import {
  createReview,
  getProductReviews,
} from '../controllers/reviewController.js';

const router = express.Router();

// Додати відгук
router.post('/', createReview);
// Отримати всі відгуки конкретного товару
router.get('/:productId', getProductReviews);

export default router;
