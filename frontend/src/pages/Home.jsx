import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { explainTopic, generateQuiz, generateFlashcards } from '../services/api';

const Home = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAction = async (action) => {
    if (!topic.trim()) {
      alert('Please enter a topic first!');
      return;
    }

    setLoading(true);
    try {
      if (action === 'explain') {
        navigate('/explain', { state: { topic } });
      } else if (action === 'quiz') {
        navigate('/quiz', { state: { topic } });
      } else if (action === 'flashcards') {
        navigate('/flashcards', { state: { topic } });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 lg:p-12 mb-8 shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            🤖 AI-Powered Study Buddy
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-8">
            Your intelligent learning companion powered by AI
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
              ✨ Smart Explanations
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
              📚 Auto Summaries
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
              🎯 Quiz Generator
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
              🃏 Flashcards
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            What would you like to learn today?
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter any topic (e.g., Photosynthesis, World War 2, Calculus)..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAction('explain')}
              className="input-field text-lg"
              disabled={loading}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleAction('explain')}
                disabled={loading || !topic.trim()}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>📖</span>
                <span>Get Explanation</span>
              </button>

              <button
                onClick={() => handleAction('quiz')}
                disabled={loading || !topic.trim()}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>🎯</span>
                <span>Generate Quiz</span>
              </button>

              <button
                onClick={() => handleAction('flashcards')}
                disabled={loading || !topic.trim()}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>🃏</span>
                <span>Create Flashcards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card hover:scale-105 cursor-pointer" onClick={() => navigate('/explain')}>
            <div className="text-4xl mb-3">📖</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Smart Explanations</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get simple, easy-to-understand explanations for any topic
            </p>
          </div>

          <div className="card hover:scale-105 cursor-pointer" onClick={() => navigate('/summarize')}>
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Notes Summarizer</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Upload your notes and get concise summaries instantly
            </p>
          </div>

          <div className="card hover:scale-105 cursor-pointer" onClick={() => navigate('/quiz')}>
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Quiz Generator</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Test your knowledge with AI-generated quizzes
            </p>
          </div>

          <div className="card hover:scale-105 cursor-pointer" onClick={() => navigate('/flashcards')}>
            <div className="text-4xl mb-3">🃏</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Flashcards</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create interactive flashcards for quick revision
            </p>
          </div>

          <div className="card hover:scale-105 cursor-pointer" onClick={() => navigate('/tutor')}>
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">AI Tutor</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Chat with our AI tutor for personalized help
            </p>
          </div>

          <div className="card bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-gray-600">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Start Learning</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter a topic above and choose your learning method!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
