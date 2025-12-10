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

const router = express.Router();

// Public routes
router.get('/', getPodcasts);
router.get('/latest', getLatestPodcast);
router.get('/featured', getFeaturedPodcasts);
router.get('/:id', getPodcast);
router.get('/:id/related', getRelatedPodcasts);

// Admin routes
router.post('/', protect, createPodcast);
router.put('/:id', protect, updatePodcast);
router.delete('/:id', protect, deletePodcast);
router.get('/admin/all', protect, getAllPodcastsAdmin);

export default router;

