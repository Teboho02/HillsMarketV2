import express from 'express';
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllProductsAdmin,
  deleteProductAdmin,
  getStatistics,
} from '../controllers/adminController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

router.get('/statistics', getStatistics);
router.get('/users', getAllUsers);
router.put('/users/:userId/role', updateUserRole);
router.delete('/users/:userId', deleteUser);
router.get('/products', getAllProductsAdmin);
router.delete('/products/:productId', deleteProductAdmin);

export default router;
