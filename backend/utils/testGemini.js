/**
 * Test Gemini API Connection
 * 
 * Run this file to test your Gemini API setup:
 * node backend/utils/testGemini.js
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// List of models to try
const modelsToTry = [
  'gemini-pro',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
];

async function testModels() {
  console.log('🔍 Testing Gemini API connection...\n');
  console.log(`API Key: ${process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Not set'}\n`);

  for (const modelName of modelsToTry) {
    try {
      console.log(`Testing model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent('Say hello in one word');
      const response = await result.response;
      const text = response.text();
      
      console.log(`✅ ${modelName} - SUCCESS! Response: ${text}\n`);
      return modelName; // Return the first working model
    } catch (error) {
      console.log(`❌ ${modelName} - FAILED: ${error.message}\n`);
    }
  }
  
  console.log('⚠️  No models worked. Please check your API key and region.');
  return null;
}

// Run the test
testModels().then((workingModel) => {
  if (workingModel) {
    console.log(`\n✅ Recommended model to use: ${workingModel}`);
  }
}).catch(console.error);
