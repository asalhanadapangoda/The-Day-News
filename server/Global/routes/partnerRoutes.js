import express from 'express';
import {
  getPartners,
  getPartnersAdmin,
  createPartner,
  updatePartner,
  deletePartner,
} from '../controllers/partnerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPartners).post(protect, createPartner);
router.route('/admin').get(protect, getPartnersAdmin);
router.route('/:id').put(protect, updatePartner).delete(protect, deletePartner);

export default router;
