import express from 'express';

import { getAllProducts } from '../controllers/productController.js';
import { getProductById } from '../controllers/productIdController.js';
import { rateProduct } from '../controllers/rateProductController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/:id/rate', rateProduct);

export default router;
