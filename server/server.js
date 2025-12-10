import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import podcastRoutes from './routes/podcastRoutes.js';

// Load env vars
dotenv.config();

// Connect to database (can be skipped in development by setting SKIP_DB=true)
if (process.env.SKIP_DB === 'true') {
  console.log('⚠️  SKIP_DB is true — skipping MongoDB connection for development');
} else {
  // connectDB now throws on errors instead of exiting; catch to keep server running
  connectDB().catch((err) => {
    console.error('⚠️  MongoDB connection failed (continuing without DB):', err.message);
  });
}

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/podcasts', podcastRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

