import express from 'express';
import { getAllProducts } from '../controllers/productController.js';
import { getProductById } from '../controllers/productIdController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;
