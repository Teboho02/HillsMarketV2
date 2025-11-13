import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from '../controllers/productController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/my-products', authenticateToken, getMyProducts);
router.get('/:id', getProductById);
router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;
