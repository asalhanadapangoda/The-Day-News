import express from 'express';
import {
  getUpcoming,
  createUpcoming,
  updateUpcoming,
  deleteUpcoming,
} from '../controllers/upcomingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getUpcoming);

// Admin routes
router.post('/', protect, createUpcoming);
router.put('/:id', protect, updateUpcoming);
router.delete('/:id', protect, deleteUpcoming);

export default router;

