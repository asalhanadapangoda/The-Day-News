
import express from 'express';
import authRoutes from './authRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import programRoutes from './programRoutes.js';
import episodeRoutes from './episodeRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import articleRoutes from './articleRoutes.js';
import adRoutes from './adRoutes.js';
import messageRoutes from './messageRoutes.js';
import settingRoutes from './settingRoutes.js';
import heroRoutes from './heroRoutes.js';
import aiRoutes from './aiRoutes.js';
import partnerRoutes from './partnerRoutes.js';
import eventRoutes from './eventRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes); // MIGHT be tricky with multer/cloudinary but should work
router.use('/programs', programRoutes);
router.use('/episodes', episodeRoutes);
router.use('/categories', categoryRoutes);
router.use('/articles', articleRoutes);
router.use('/ads', adRoutes);
router.use('/messages', messageRoutes);
router.use('/settings', settingRoutes);
router.use('/heroes', heroRoutes);
router.use('/ai', aiRoutes);
router.use('/partners', partnerRoutes);
router.use('/events', eventRoutes);

export default router;
