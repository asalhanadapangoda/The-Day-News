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

const app = express();

// Connect to database (non-blocking - server will start even if connection is pending)
connectDB().catch((error) => {
  logger.error('Failed to connect to database on startup:', error.message);
  // Don't exit - allow server to start and retry connections
  // MongoDB will retry automatically on subsequent requests
});

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
// Normalize CLIENT_URL by removing trailing slash for proper CORS matching
const getCorsOrigin = () => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  // Remove trailing slash to ensure exact match with browser origin
  return clientUrl.replace(/\/+$/, '');
};

app.use(cors({
  origin: getCorsOrigin(),
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

// Root route - API information
app.get('/', (req, res) => {
  res.json({
    message: 'The Day News API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      podcasts: '/api/podcasts',
      sections: '/api/sections',
      upcoming: '/api/upcoming',
      chatbot: '/api/chatbot',
      contact: '/api/contact',
    },
    documentation: 'Visit /api/health to check server status',
  });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0'; // Listen on all interfaces for Render deployment

app.listen(PORT, HOST, () => {
  logger.info(`Server running on ${HOST}:${PORT}`);
});

