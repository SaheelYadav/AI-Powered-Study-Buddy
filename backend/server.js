/**
 * AI-Powered Study Buddy - Backend Server
 * 
 * This is the main entry point for the Express backend server.
 * It sets up middleware, connects to MongoDB, and registers routes.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { validateGeminiConfig } from './config/gemini.js';

// Import routes
import studyRoutes from './routes/study.js';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
// CORS allows frontend (running on different port) to communicate with backend
app.use(cors());
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Basic route to test if server is running
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI-Powered Study Buddy API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: 'Connected' // We'll make this dynamic later
  });
});

// API Routes
app.use('/api/study', studyRoutes);

// 404 handler - must be after all routes
app.use(notFound);

// Error handler - must be last middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  // Validate Gemini configuration
  if (validateGeminiConfig()) {
    console.log('✅ Gemini API configured');
  } else {
    console.log('⚠️  Gemini API not configured - AI features will not work');
  }

  // Connect to MongoDB
  connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 API available at http://localhost:${PORT}`);
    console.log(`📚 Study API endpoints available at http://localhost:${PORT}/api/study`);
  });
}

export default app;
