import express from 'express';
import {
  getEvents,
  getAdminEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getEvents).post(protect, createEvent);
router.route('/admin').get(protect, getAdminEvents);
router.route('/:slug').get(getEventBySlug);
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);

export default router;
