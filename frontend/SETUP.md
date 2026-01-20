# Frontend Setup Guide

## Quick Start

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

This will install:
- React & React DOM
- React Router (for navigation)
- Axios (for API calls)
- Tailwind CSS (for styling)
- Heroicons (for icons)
- Vite (build tool)

### Step 2: Start Development Server

```bash
npm run dev
```

The app will start on `http://localhost:3000`

### Step 3: Verify Backend Connection

Make sure your backend server is running on `http://localhost:5000`

If your backend is on a different port, create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure Explained

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main layout with navigation
│   │   └── RobotAvatar.jsx     # Animated robot component
│   ├── pages/
│   │   ├── Home.jsx            # Dashboard/Home page
│   │   ├── Explanation.jsx     # Topic explanation page
│   │   ├── NotesSummarizer.jsx # Notes summarization page
│   │   ├── QuizGenerator.jsx   # Quiz generation & taking
│   │   ├── Flashcards.jsx       # Flashcard learning
│   │   └── AITutor.jsx         # Chatbot with robot avatar
│   ├── services/
│   │   └── api.js              # All API calls to backend
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles + Tailwind
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── tailwind.config.js          # Tailwind configuration
```

## Features

### 🎨 Design System
- **Colors**: Soft blues, purples, and pinks
- **Components**: Rounded cards, gradient buttons
- **Animations**: Smooth transitions, loading spinners
- **Responsive**: Mobile-first design

### 📱 Responsive Navigation
- **Desktop**: Sidebar on left
- **Mobile**: Bottom navigation + hamburger menu

### 🤖 Robot Avatar
- Blinking eyes animation
- Speaking indicator when AI responds
- Smooth animations

### 📄 Pages

1. **Home** - Main dashboard with topic input
2. **Explanation** - Get AI explanations
3. **Notes Summarizer** - Summarize text
4. **Quiz Generator** - Generate and take quizzes
5. **Flashcards** - Interactive flashcard learning
6. **AI Tutor** - Chat with robot tutor

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically use the next available port.

### API Connection Issues
1. Check if backend is running on port 5000
2. Check browser console for CORS errors
3. Verify `.env` file has correct API URL

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Frontend is ready!
2. Make sure backend is running
3. Test all features
4. Customize colors/styling in `tailwind.config.js`
5. Add more features as needed

## Production Build

```bash
npm run build
```

Output will be in `dist/` folder, ready to deploy!
