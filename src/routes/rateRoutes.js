import express from 'express';
import { rateProduct } from '../controllers/rateProductController.js';

const router = express.Router();

// рейтинг для конкретного товару
router.post('/:id', rateProduct);

export default router;
