import express from 'express';
import {
  getPodcasts,
  getPodcast,
  getLatestPodcast,
  getFeaturedPodcasts,
  getRelatedPodcasts,
  createPodcast,
  updatePodcast,
  deletePodcast,
  getAllPodcastsAdmin,
} from '../controllers/podcastController.js';
import { protect } from '../middleware/auth.js';
import { validatePodcast } from '../middleware/validation.js';
import { adminLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.get('/', getPodcasts);
router.get('/latest', getLatestPodcast);
router.get('/featured', getFeaturedPodcasts);
router.get('/:id', getPodcast);
router.get('/:id/related', getRelatedPodcasts);

// Admin routes - All protected with rate limiting and validation
router.post('/', adminLimiter, protect, validatePodcast, createPodcast);
router.put('/:id', adminLimiter, protect, validatePodcast, updatePodcast);
router.delete('/:id', adminLimiter, protect, deletePodcast);
router.get('/admin/all', adminLimiter, protect, getAllPodcastsAdmin);

export default router;

