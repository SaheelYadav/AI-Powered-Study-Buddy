/**
 * Study Routes
 * 
 * This file defines all the API routes for study-related features.
 * All routes use Google Gemini AI for generating content.
 */

import express from 'express';
import {
  explainTopic,
  summarizeNotes,
  generateQuiz,
  generateFlashcards,
  askQuestion,
} from '../controllers/studyController.js';

const router = express.Router();

/**
 * GET /api/study
 * List all available study endpoints
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Study API endpoints',
    endpoints: {
      explain: {
        method: 'POST',
        path: '/api/study/explain',
        description: 'Get simple explanation for a topic',
        body: { topic: 'string' }
      },
      summarize: {
        method: 'POST',
        path: '/api/study/summarize',
        description: 'Summarize study notes or text content',
        body: { text: 'string' }
      },
      quiz: {
        method: 'POST',
        path: '/api/study/quiz',
        description: 'Generate quiz questions from a topic',
        body: { topic: 'string', numQuestions: 'number (optional, default 5)' }
      },
      flashcards: {
        method: 'POST',
        path: '/api/study/flashcards',
        description: 'Generate flashcards from a topic',
        body: { topic: 'string', numCards: 'number (optional, default 10)' }
      },
      ask: {
        method: 'POST',
        path: '/api/study/ask',
        description: 'Ask follow-up questions (tutor mode)',
        body: { question: 'string', context: 'string (optional)' }
      }
    }
  });
});

/**
 * POST /api/study/explain
 * Get simple explanation for a topic
 * Body: { topic: string }
 */
router.post('/explain', explainTopic);

/**
 * POST /api/study/summarize
 * Summarize study notes or text content
 * Body: { text: string }
 */
router.post('/summarize', summarizeNotes);

/**
 * POST /api/study/quiz
 * Generate quiz questions from a topic
 * Body: { topic: string, numQuestions: number (optional, default 5) }
 */
router.post('/quiz', generateQuiz);

/**
 * POST /api/study/flashcards
 * Generate flashcards from a topic
 * Body: { topic: string, numCards: number (optional, default 10) }
 */
router.post('/flashcards', generateFlashcards);

/**
 * POST /api/study/ask
 * Ask follow-up questions (tutor mode)
 * Body: { question: string, context: string (optional) }
 */
router.post('/ask', askQuestion);

export default router;
