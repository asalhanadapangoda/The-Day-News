import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import uploadVideo from '../middleware/uploadVideoMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

import fs from 'fs';

const router = express.Router();

router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'thedaynewsglobal' },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Image upload failed' });
        }
        res.json({
          message: 'Image Uploaded successfully',
          url: result.secure_url,
        });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

router.post('/video', uploadVideo.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video provided' });
    }

    // Upload from disk directly to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'thedaynewsglobal_videos',
      resource_type: 'video'
    });

    // Delete the temp file after successful upload
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json({
      message: 'Video Uploaded successfully',
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    // Ensure temp file is deleted even if upload fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error during video upload' });
  }
});

router.post('/multiple', protect, upload.array('files', 12), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images provided' });
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'thedaynewsglobal' },
          (error, result) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
        stream.end(file.buffer);
      });
    });

    const urls = await Promise.all(uploadPromises);
    res.json({
      message: `${urls.length} images uploaded successfully`,
      urls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during multi-upload' });
  }
});

export default router;
