import multer from 'multer';

import fs from 'fs';
import path from 'path';

// Create uploads temp directory if it doesn't exist
const uploadDir = 'uploads_temp';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Use disk storage to prevent RAM exhaustion (OOM) for large videos
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploadVideo = multer({
  storage: diskStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max size for videos
  },
  fileFilter(req, file, cb) {
    // Check if it is a video mime type
    if (!file.mimetype.startsWith('video/') && !file.originalname.match(/\.(mp4|webm|mov|mkv|avi)$/i)) {
      return cb(new Error('Please upload a valid video file'));
    }
    cb(undefined, true);
  },
});

export default uploadVideo;
