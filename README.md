# 🤖 AI-Powered Study Buddy

> An intelligent, interactive learning companion designed to help students understand concepts, retain information, and study smarter using the power of Google Gemini AI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React-61DAFB.svg?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/backend-Node.js-339933.svg?logo=node.js&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2.svg)

---

## 📖 About The Project

Students often struggle with dense textbooks, boring lectures, and a lack of personalized feedback. **AI-Powered Study Buddy** bridges this gap by providing an always-available tutor that adapts to your learning style.

Whether you need a complex topic explained like you're 10 years old, a quick summary of your notes, or a custom quiz to test your knowledge, this application handles it all in seconds.

### ✨ Key Features

- **📖 Smart Explanations:** Get simple, beginner-friendly explanations for any topic.
- **📄 Notes Summarizer:** Paste untidy notes and get a clean, bulleted summary instantly.
- **🎯 Quiz Generator:** Generate custom multiple-choice quizzes on any subject to test your knowledge.
- **🃏 Flashcard Creator:** Automatically create study flashcards with flip animations.
- **💬 AI Tutor Chat:** A friendly "Robo Teacher" persona that answers questions and guides your learning.
- **🌗 Dark Mode:** Fully persistent light/dark theme aimed at reducing eye strain during late-night study sessions.

---

## 🛠 Tech Stack

### Frontend
- **React (Vite):** Fast, modern UI library.
- **Tailwind CSS:** Utility-first CSS framework for beautiful, responsive design.
- **Heroicons:** Clean, modern icons.

### Backend
- **Node.js & Express:** Robust REST API server.
- **Google Gemini API:** The brain behind the AI features.
- **MongoDB:** (Optional) Ready for data persistence (currently configured but can run in lightweight mode).

---

## 📂 Project Structure

```bash
IBM/
├── backend/                 # Express Server & API logic
│   ├── config/             # Database & AI configuration
│   ├── controllers/        # Request handlers (AI logic resides here)
│   ├── routes/             # API endpoints
│   ├── server.js           # Entry point
│   └── .env                # API Keys (Not committed)
│
├── frontend/                # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application views
│   │   ├── services/       # API integration
│   │   └── App.jsx         # Main router
│   └── tailwind.config.js  # Styling configuration
│
└── README.md               # You are here!
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SaheelYadav/AI-Powered-Study-Buddy.git
cd ai-study-buddy
```

### 2️⃣ Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```
> **Note:** Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

Start the server:
```bash
npm run dev
```
*Server runs on http://localhost:5000*

### 3️⃣ Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the React app:
```bash
npm run dev
```
*Frontend runs on http://localhost:5173*

---

## 💡 How to Use

1. **Dashboard:** Choose a tool from the home screen (Explain, Quiz, Flashcards, etc.).
2. **Enter a Topic:** Type a subject (e.g., "Photosynthesis") and hit enter.
3. **Learn:**
   - **Explain:** Read the simplified breakdown.
   - **Quiz:** Take the quiz and see your score.
   - **Flashcards:** Click cards to flip them and test your memory.
   - **Tutor:** Chat with the AI for specific questions.
4. **Theme:** Toggle the Sun/Moon icon in the sidebar to switch themes.

---

## 🔮 Future Improvements

- [ ] **User Accounts:** Save your progress, quizzes, and flashcards.
- [ ] **PDF Support:** Upload PDF textbooks for direct summarization.
- [ ] **Voice Mode:** Speak to the AI Tutor instead of typing.
- [ ] **Progress Tracking:** Visual graphs of your study habits.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

**Happy Studying! 🎓**
