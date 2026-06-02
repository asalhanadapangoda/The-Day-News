import express from 'express';
import { authAdmin, getAdminProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
router.get('/profile', protect, getAdminProfile);

export default router;
