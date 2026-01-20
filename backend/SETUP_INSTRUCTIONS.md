# Backend Setup Instructions

## 📁 Project Structure Explained

```
backend/
├── config/
│   ├── database.js      # MongoDB connection configuration
│   └── openai.js        # OpenAI API client setup
│
├── middleware/
│   └── errorHandler.js  # Global error handling middleware
│
├── models/
│   └── User.js          # User database schema/model
│
├── routes/              # API route definitions (to be created)
├── controllers/         # Route handlers (to be created)
├── utils/               # Helper functions (to be created)
├── uploads/             # Storage for uploaded files
│
├── server.js            # Main server entry point ⭐ START HERE
├── package.json         # Dependencies and scripts
└── .env                 # Environment variables (YOU NEED TO CREATE THIS)
```

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

Open your terminal in the `backend` folder and run:

```bash
npm install
```

This will install all packages listed in `package.json`:
- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **dotenv**: Loads environment variables from .env file
- **cors**: Enables cross-origin requests
- **openai**: Official OpenAI API client
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **multer**: File upload handling
- **pdf-parse**: Extract text from PDF files

### Step 2: Set Up Environment Variables

1. Create a `.env` file in the `backend` folder
2. See `ENV_SETUP.md` for detailed instructions
3. You need:
   - MongoDB connection string
   - OpenAI API key
   - JWT secret (any random string)

### Step 3: Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### Step 4: Verify It's Working

Open your browser and go to:
- `http://localhost:5000` - Should show API welcome message
- `http://localhost:5000/api/health` - Should show health status

## 📝 File Explanations

### `server.js` (Main Entry Point)
- Creates Express app
- Sets up middleware (CORS, JSON parsing)
- Connects to MongoDB
- Registers routes (commented out for now)
- Starts the server on port 5000

### `config/database.js`
- Handles MongoDB connection
- Provides connection status
- Handles graceful shutdown

### `config/openai.js`
- Creates OpenAI client instance
- Validates API key configuration
- Exports client for use in other files

### `middleware/errorHandler.js`
- Catches all errors in the app
- Sends formatted error responses
- Handles 404 (not found) errors

### `models/User.js`
- Defines User schema for MongoDB
- Includes password hashing
- Stores user study history

## 🔍 What's Next?

The backend base is ready! Next steps will include:
1. Creating authentication routes (register, login)
2. Creating study routes (explanations, quizzes, flashcards)
3. Creating upload routes (PDF processing)
4. Adding authentication middleware
5. Implementing AI integration functions

## ❓ Troubleshooting

**Error: Cannot find module**
- Run `npm install` again

**Error: MongoDB connection failed**
- Check your `.env` file has correct `MONGODB_URI`
- Make sure MongoDB is running (if local)
- Check MongoDB Atlas IP whitelist (if using Atlas)

**Error: Port already in use**
- Change `PORT` in `.env` file
- Or stop the process using port 5000

**Server starts but shows MongoDB error**
- This is normal if MongoDB isn't set up yet
- You can still test the API endpoints
- Set up MongoDB before adding database features

## ✅ Checklist

Before moving to next step, make sure:
- [ ] `npm install` completed successfully
- [ ] `.env` file created with all required variables
- [ ] Server starts without errors (`npm run dev`)
- [ ] Can access `http://localhost:5000` in browser
- [ ] Health endpoint works (`http://localhost:5000/api/health`)
