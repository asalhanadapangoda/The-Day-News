import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { validateEnv } from './utils/validateEnv.js';
import logger from './utils/logger.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import podcastRoutes from './routes/podcastRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';
import upcomingRoutes from './routes/upcomingRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Load env vars
dotenv.config();

// Validate required environment variables
validateEnv();

// Connect to database
connectDB();

const app = express();

// Security Middleware - Helmet for security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow images/videos from external sources
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for Tailwind
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"], // Allow images from any HTTPS source
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'", "https:"],
      frameSrc: ["'self'", "https:"], // Allow iframes for video embeds
    },
  },
}));

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting for all API routes (excluding health check)
app.use('/api', (req, res, next) => {
  // Skip rate limiting for health check
  if (req.path === '/health') {
    return next();
  }
  apiLimiter(req, res, next);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/podcasts', podcastRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/upcoming', upcomingRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

