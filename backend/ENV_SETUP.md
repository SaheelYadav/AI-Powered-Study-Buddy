# Environment Setup Guide

## Creating Your .env File

1. In the `backend` folder, create a new file named `.env` (not `.env.example`)

2. Copy the following content into your `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
# Option 1: Local MongoDB (if you have MongoDB installed locally)
MONGODB_URI=mongodb://localhost:27017/study-buddy

# Option 2: MongoDB Atlas (cloud database - recommended for beginners)
# Get free account at: https://www.mongodb.com/cloud/atlas
# Format: mongodb+srv://username:password@cluster.mongodb.net/study-buddy
# MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/study-buddy

# Google Gemini API Configuration
# Get your API key from: https://makersuite.google.com/app/apikey
# Free tier available with generous limits
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Secret for authentication tokens
# Generate a random string for production use
# You can use: openssl rand -base64 32 (in terminal) or any random string generator
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# File Upload Configuration
MAX_FILE_SIZE=10485760
# Max file size in bytes (10MB default)
```

## Step-by-Step Setup

### 1. MongoDB Setup

**Option A: MongoDB Atlas (Recommended - Free & Easy)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (free tier is fine)
4. Create a database user (username/password)
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string and replace `MONGODB_URI` in `.env`

**Option B: Local MongoDB**
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Use `mongodb://localhost:27017/study-buddy` as your `MONGODB_URI`

### 2. Google Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Copy the generated API key
5. Paste it in `.env` file as `GEMINI_API_KEY`

**Important**: 
- Keep your API key secret! Never commit `.env` to git.
- Google Gemini offers a free tier with generous usage limits
- The API key is free to use for development and testing

### 3. JWT Secret

Generate a random string for JWT_SECRET. You can:
- Use an online random string generator
- Run `openssl rand -base64 32` in terminal
- Use any long random string

## Verifying Setup

After creating your `.env` file, start the server:

```bash
cd backend
npm install
npm run dev
```

You should see:
- ✅ MongoDB Connected: ...
- 🚀 Server running on port 5000

If you see errors, check:
1. Is MongoDB running/accessible?
2. Is your `.env` file in the `backend` folder?
3. Are all required values filled in?
