/**
 * Study Controller
 * 
 * This file contains all the controller functions for study-related features.
 * Each function handles a specific AI-powered study feature using Google Gemini.
 */

import { generateText } from '../config/gemini.js';

/**
 * Get simple explanation for a topic
 * POST /api/study/explain
 * Body: { topic: string }
 */
export const explainTopic = async (req, res) => {
  try {
    const { topic } = req.body;

    // Validate input
    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Topic is required',
      });
    }

    // Create prompt for Gemini
    const prompt = `Explain "${topic}" to a 10-year-old student.

TEACHING STYLE:
- Use simple, easy words.
- Use fun examples from daily life (like games, sports, or nature).
- Break it down into small steps.
- Be encouraging and friendly!

FORMATTING RULES:
- use plain text only (NO markdown, NO bold, NO italics).
- use short paragraphs.
- use simple numbering 1. 2. 3. for steps.
- NO headings with # symbols.
- Ensure the response is COMPLETE and does not stop mid-sentence.

Structure:
1. Title (Fun & Friendly)
2. What is it? (Simple definition)
3. Why is it important? (Real-life relevance)
4. How does it work? (Step-by-step)
5. Real-world example (Daily life analogy)
6. Quick Summary (3-4 bullet points)`;

    // Generate explanation using Gemini
    const explanation = await generateText(prompt, {
      temperature: 0.7,
      maxTokens: 2000, // Increased to prevent cut-off
    });

    res.json({
      success: true,
      data: {
        topic,
        explanation,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error explaining topic:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate explanation. Please try again.',
    });
  }
};

/**
 * Summarize study notes or text
 * POST /api/study/summarize
 * Body: { text: string }
 */
export const summarizeNotes = async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Text content is required',
      });
    }

    // Create prompt for Gemini
    const prompt = `Summarize this for a student to help them study.
Text: "${text}"

Rules:
- Keep it short and clear.
- Use simple bullet points (plain text, use - for bullets).
- Highlight key facts.
- No markdown symbols like ** or ##.`;

    // Generate summary using Gemini
    const summary = await generateText(prompt, {
      temperature: 0.5,
      maxTokens: 1500,
    });

    res.json({
      success: true,
      data: {
        originalLength: text.length,
        summary,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error summarizing notes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate summary. Please try again.',
    });
  }
};

/**
 * Generate quiz questions from a topic or notes
 * POST /api/study/quiz
 * Body: { topic: string, numQuestions: number (optional, default 5) }
 */
export const generateQuiz = async (req, res) => {
  try {
    const { topic, numQuestions = 5 } = req.body;

    // Validate input
    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Topic is required',
      });
    }

    // Validate number of questions
    const questionCount = Math.min(Math.max(parseInt(numQuestions) || 5, 1), 20);

    // Create prompt for Gemini
    const prompt = `Generate ${questionCount} quiz questions about "${topic}".
    
For each question, provide:
1. Question text
2. Four multiple-choice options (A, B, C, D)
3. Correct answer (just the letter)
4. Brief explanation of why that answer is correct

Format your response as a JSON array where each object has:
{
  "question": "question text",
  "options": {
    "A": "option A",
    "B": "option B",
    "C": "option C",
    "D": "option D"
  },
  "correctAnswer": "A",
  "explanation": "brief explanation"
}

Make questions of varying difficulty levels. Return ONLY the JSON array, no additional text.`;

    // Generate quiz using Gemini
    const quizResponse = await generateText(prompt, {
      temperature: 0.8,
      maxTokens: 2000,
    });

    // Try to parse JSON from response
    let quiz;
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = quizResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        quiz = JSON.parse(jsonMatch[0]);
      } else {
        quiz = JSON.parse(quizResponse);
      }
    } catch (parseError) {
      // If parsing fails, return as structured text
      return res.json({
        success: true,
        data: {
          topic,
          questions: [],
          rawResponse: quizResponse,
          note: 'Could not parse structured quiz. Raw response provided.',
        },
      });
    }

    res.json({
      success: true,
      data: {
        topic,
        numQuestions: quiz.length,
        questions: quiz,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate quiz. Please try again.',
    });
  }
};

/**
 * Generate flashcards from a topic or notes
 * POST /api/study/flashcards
 * Body: { topic: string, numCards: number (optional, default 10) }
 */
export const generateFlashcards = async (req, res) => {
  try {
    const { topic, numCards = 10 } = req.body;

    // Validate input
    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Topic is required',
      });
    }

    // Validate number of cards
    const cardCount = Math.min(Math.max(parseInt(numCards) || 10, 1), 50);

    // Create prompt for Gemini
    const prompt = `Generate ${cardCount} flashcards about "${topic}".

Each flashcard should have:
- Front: A question or term/concept
- Back: A clear, concise answer or definition

Format your response as a JSON array where each object has:
{
  "front": "question or term",
  "back": "answer or definition"
}

Make flashcards that cover important concepts, definitions, and key facts about the topic.
Return ONLY the JSON array, no additional text.`;

    // Generate flashcards using Gemini
    const flashcardsResponse = await generateText(prompt, {
      temperature: 0.7,
      maxTokens: 2000,
    });

    // Try to parse JSON from response
    let flashcards;
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = flashcardsResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        flashcards = JSON.parse(jsonMatch[0]);
      } else {
        flashcards = JSON.parse(flashcardsResponse);
      }
    } catch (parseError) {
      // If parsing fails, return as structured text
      return res.json({
        success: true,
        data: {
          topic,
          cards: [],
          rawResponse: flashcardsResponse,
          note: 'Could not parse structured flashcards. Raw response provided.',
        },
      });
    }

    res.json({
      success: true,
      data: {
        topic,
        numCards: flashcards.length,
        cards: flashcards,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate flashcards. Please try again.',
    });
  }
};

/**
 * Ask follow-up questions (tutor mode)
 * POST /api/study/ask
 * Body: { question: string, context: string (optional) }
 */
export const askQuestion = async (req, res) => {
  try {
    const { question, context } = req.body;

    // Validate input
    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Question is required',
      });
    }

    // Create prompt for Gemini
    let prompt = `You are a friendly Robo Teacher. 🤖
    
YOUR PERSONALITY:
- Warm, kind, and patient.
- You explain things slowly and clearly.
- You love using examples from school, toys, or nature.
- You never use big, scary words.

Question: "${question}"`;

    if (context && context.trim().length > 0) {
      prompt += `\n\nContext:\n${context}`;
    }

    prompt += `\n\nExplain it like you are sitting next to the student. Be helpful!`;

    // Generate answer using Gemini
    const answer = await generateText(prompt, {
      temperature: 0.7,
      maxTokens: 1500,
    });

    res.json({
      success: true,
      data: {
        question,
        answer,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error answering question:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate answer. Please try again.',
    });
  }
};
