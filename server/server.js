import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import programRoutes from './routes/programRoutes.js';
import episodeRoutes from './routes/episodeRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import adRoutes from './routes/adRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bdRoutes from './Bangladesh/routes/index.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());

// Security Middleware
// app.use(mongoSanitize());

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: 'Too many login attempts, please try again after 15 minutes' }
});

// Apply rate limiter to auth routes
app.use('/api/auth', authLimiter);
app.use('/api/bangladesh/auth', authLimiter);

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/episodes', episodeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/heroes', heroRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/events', eventRoutes);

// Mount Bangladesh Routes
app.use('/api/bangladesh', bdRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));