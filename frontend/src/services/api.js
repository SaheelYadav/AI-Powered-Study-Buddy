/**
 * API Service Layer
 * 
 * This file handles all API calls to the backend using Axios.
 * All study-related API endpoints are centralized here.
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Study API Functions
 */

/**
 * Get explanation for a topic
 * @param {string} topic - The topic to explain
 * @returns {Promise} - API response with explanation
 */
export const explainTopic = async (topic) => {
  try {
    const response = await api.post('/study/explain', { topic });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Summarize study notes or text
 * @param {string} text - The text to summarize
 * @returns {Promise} - API response with summary
 */
export const summarizeNotes = async (text) => {
  try {
    const response = await api.post('/study/summarize', { text });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Generate quiz questions
 * @param {string} topic - The topic for quiz
 * @param {number} numQuestions - Number of questions (optional)
 * @returns {Promise} - API response with quiz questions
 */
export const generateQuiz = async (topic, numQuestions = 5) => {
  try {
    const response = await api.post('/study/quiz', { topic, numQuestions });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Generate flashcards
 * @param {string} topic - The topic for flashcards
 * @param {number} numCards - Number of cards (optional)
 * @returns {Promise} - API response with flashcards
 */
export const generateFlashcards = async (topic, numCards = 10) => {
  try {
    const response = await api.post('/study/flashcards', { topic, numCards });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Ask a question to AI tutor
 * @param {string} question - The question to ask
 * @param {string} context - Optional context (previous topic/notes)
 * @returns {Promise} - API response with answer
 */
export const askQuestion = async (question, context = '') => {
  try {
    const response = await api.post('/study/ask', { question, context });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
