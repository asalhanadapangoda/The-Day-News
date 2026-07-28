import express from 'express';
import {
  getArticleMeta,
  getCountryArticleMeta,
  getProgramMeta,
  getEventMeta,
  getCountryProgramMeta,
  getCountryEventMeta,
} from '../controllers/metaController.js';

const router = express.Router();

// Global content metadata
router.get('/articles/:slug', getArticleMeta);
router.get('/programs/:slug', getProgramMeta);
router.get('/events/:slug', getEventMeta);

// Country article metadata
router.get('/:country/articles/:slug', getCountryArticleMeta);
router.get('/:country/programs/:slug', getCountryProgramMeta);
router.get('/:country/events/:slug', getCountryEventMeta);

export default router;
