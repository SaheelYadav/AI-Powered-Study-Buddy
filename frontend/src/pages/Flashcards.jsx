import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateFlashcards } from '../services/api';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Flashcards = () => {
  const location = useLocation();
  const [topic, setTopic] = useState(location.state?.topic || '');
  const [numCards, setNumCards] = useState(10);
  const [flashcards, setFlashcards] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleGenerateFlashcards = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic!');
      return;
    }

    setLoading(true);
    setError(null);
    setFlashcards(null);
    setCurrentIndex(0);
    setIsFlipped(false);

    try {
      const response = await generateFlashcards(topic, numCards);
      setFlashcards(response.data);
    } catch (err) {
      setError(err.error || 'Failed to generate flashcards. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (flashcards && currentIndex < flashcards.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (location.state?.topic && !flashcards) {
      handleGenerateFlashcards();
    }
  }, []);

  const currentCard = flashcards?.cards[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          🃏 Flashcard Generator
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter topic for flashcards..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input-field text-lg"
            disabled={loading}
          />

          <div className="flex items-center space-x-4">
            <label className="text-gray-700 dark:text-gray-300 font-medium">Number of Cards:</label>
            <select
              value={numCards}
              onChange={(e) => setNumCards(parseInt(e.target.value))}
              className="input-field w-32"
              disabled={loading}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          <button
            onClick={handleGenerateFlashcards}
            disabled={loading || !topic.trim()}
            className="btn-primary w-full"
          >
            {loading ? 'Generating Flashcards...' : 'Generate Flashcards'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 text-lg">AI is creating your flashcards...</p>
            <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="card bg-red-50 border-2 border-red-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">❌</span>
            <div>
              <h3 className="font-bold text-red-800">Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Flashcard Display */}
      {flashcards && currentCard && (
        <div className="space-y-6">
          {/* Card Counter */}
          <div className="text-center text-gray-600">
            Card {currentIndex + 1} of {flashcards.cards.length}
          </div>

          {/* Flashcard */}
          {/* Flashcard */}
          <div className="relative h-96 w-full perspective-1000">
            <div
              className={`relative w-full h-full text-center transition-transform duration-700 transform-style-preserve-3d cursor-pointer shadow-xl rounded-2xl ${isFlipped ? 'rotate-y-180' : ''
                }`}
              onClick={handleFlip}
            >
              {/* Front of Card */}
              <div className="card-face card-face-front bg-gradient-to-br from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-8">
                <div className="text-4xl mb-4">❓</div>
                <h2 className="text-3xl font-bold mb-4">Question</h2>
                <p className="text-2xl font-medium">{currentCard.front}</p>
                <p className="text-sm mt-8 opacity-75 bg-white/20 px-4 py-2 rounded-full inline-block">
                  Click to reveal answer
                </p>
              </div>

              {/* Back of Card */}
              <div className="card-face card-face-back bg-gradient-to-br from-purple-500 to-pink-600 text-white flex flex-col items-center justify-center p-8">
                <div className="text-4xl mb-4">💡</div>
                <h2 className="text-3xl font-bold mb-4">Answer</h2>
                <p className="text-2xl font-medium">{currentCard.back}</p>
                <p className="text-sm mt-8 opacity-75 bg-white/20 px-4 py-2 rounded-full inline-block">
                  Click to see question
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleFlip}
              className="btn-primary"
            >
              {isFlipped ? 'Show Question' : 'Show Answer'}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === flashcards.cards.length - 1}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / flashcards.cards.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
