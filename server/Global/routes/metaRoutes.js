import express from 'express';
import {
  getArticleMeta,
  getProgramMeta,
  getEventMeta,
} from '../controllers/metaController.js';

const router = express.Router();

// Global content metadata
router.get('/articles/:slug', getArticleMeta);
router.get('/programs/:slug', getProgramMeta);
router.get('/events/:slug', getEventMeta);


export default router;
