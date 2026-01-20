# AI-Powered Study Buddy - Frontend

Modern React frontend for the AI-Powered Study Buddy application with Robo Tutor.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Heroicons** - Icon library

## Features

- 🏠 **Home/Dashboard** - Main landing page with topic input
- 📖 **Explanation Page** - AI-powered topic explanations
- 📄 **Notes Summarizer** - Summarize study notes
- 🎯 **Quiz Generator** - Generate and take quizzes
- 🃏 **Flashcards** - Interactive flashcard learning
- 💬 **AI Tutor Chatbot** - Chat with animated robot tutor

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open your browser:
   ```
   http://localhost:3000
   ```

### Environment Variables

Create a `.env` file in the frontend directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

If not set, it defaults to `http://localhost:5000/api`.

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Layout.jsx    # Main layout with navigation
│   │   └── RobotAvatar.jsx # Animated robot avatar
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Explanation.jsx
│   │   ├── NotesSummarizer.jsx
│   │   ├── QuizGenerator.jsx
│   │   ├── Flashcards.jsx
│   │   └── AITutor.jsx
│   ├── services/         # API service layer
│   │   └── api.js        # Axios API calls
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features Overview

### Responsive Design
- **Desktop**: Sidebar navigation on the left
- **Mobile**: Bottom navigation bar + hamburger menu
- Fully responsive across all screen sizes

### UI/UX Highlights
- Modern gradient hero sections
- Smooth transitions and animations
- Loading states with spinners
- Error handling with user-friendly messages
- Card-based layouts
- Soft color palette (blues, purples, pinks)

### Robot Avatar
- Animated blinking eyes
- Speaking indicator when AI responds
- Smooth animations
- Professional design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Integration

All API calls are handled through `src/services/api.js`:
- `explainTopic(topic)` - Get topic explanation
- `summarizeNotes(text)` - Summarize text
- `generateQuiz(topic, numQuestions)` - Generate quiz
- `generateFlashcards(topic, numCards)` - Generate flashcards
- `askQuestion(question, context)` - Chat with AI tutor

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
