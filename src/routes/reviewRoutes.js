import express from 'express';
import {
  createReview,
  getProductReviews,
  deleteReview,
} from '../controllers/reviewController.js';

const router = express.Router();

// Додати відгук
router.post('/', createReview);
// Отримати всі відгуки конкретного товару
router.get('/:productId', getProductReviews);
// Видалити відгук
router.delete('/:id', deleteReview);

export default router;
