import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateQuiz } from '../services/api';

const QuizGenerator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(location.state?.topic || '');
  const [numQuestions, setNumQuestions] = useState(5);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic!');
      return;
    }

    setLoading(true);
    setError(null);
    setQuiz(null);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);

    try {
      const response = await generateQuiz(topic, numQuestions);
      setQuiz(response.data);
    } catch (err) {
      setError(err.error || 'Failed to generate quiz. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    if (showResults) return;
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });
  };

  const calculateScore = () => {
    if (!quiz || !quiz.questions) return;

    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });

    setScore(correct);
    setShowResults(true);
  };

  useEffect(() => {
    if (location.state?.topic && !quiz) {
      handleGenerateQuiz();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          🎯 Quiz Generator
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter topic for quiz..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input-field text-lg"
            disabled={loading}
          />

          <div className="flex items-center space-x-4">
            <label className="text-gray-700 dark:text-gray-300 font-medium">Number of Questions:</label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              className="input-field w-32"
              disabled={loading}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          <button
            onClick={handleGenerateQuiz}
            disabled={loading || !topic.trim()}
            className="btn-primary w-full"
          >
            {loading ? 'Generating Quiz...' : 'Generate Quiz'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 text-lg">AI is creating your quiz...</p>
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

      {/* Quiz Questions */}
      {quiz && quiz.questions && quiz.questions.length > 0 && (
        <div className="space-y-6">
          {quiz.questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const showAnswer = showResults;

            return (
              <div
                key={index}
                className={`card ${showAnswer
                  ? isCorrect
                    ? 'bg-green-50 border-2 border-green-300'
                    : 'bg-red-50 border-2 border-red-300'
                  : ''
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Question {index + 1}
                  </h3>
                  {showAnswer && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                        }`}
                    >
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </div>

                <p className="text-lg text-gray-800 dark:text-gray-100 font-medium mb-4">{question.question}</p>

                <div className="space-y-3">
                  {Object.entries(question.options).map(([key, value]) => {
                    const isSelected = userAnswer === key;
                    const isCorrectAnswer = question.correctAnswer === key;

                    let buttonClass = 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400';

                    if (showResults) {
                      if (isCorrectAnswer) {
                        buttonClass = 'bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-400 font-bold text-green-800 dark:text-green-300';
                      } else if (isSelected && !isCorrectAnswer) {
                        buttonClass = 'bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-400 text-red-800 dark:text-red-300';
                      } else {
                        buttonClass = 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-70';
                      }
                    } else if (isSelected) {
                      buttonClass = 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400';
                    }

                    return (
                      <button
                        key={key}
                        onClick={() => handleAnswerSelect(index, key)}
                        disabled={showResults}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-gray-800 dark:text-gray-100 ${buttonClass}`}
                      >
                        <span className={`font-bold mr-2 ${showResults && isCorrectAnswer ? 'text-green-700 dark:text-green-400' :
                          isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-blue-600 dark:text-blue-400'
                          }`}>{key}:</span>
                        {value}
                        {showResults && isCorrectAnswer && (
                          <span className="ml-2 text-green-600 dark:text-green-400 font-bold">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showAnswer && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
                    <p className="text-gray-800 dark:text-gray-200">
                      <strong className="text-blue-800 dark:text-blue-300">Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Score Display */}
          {showResults && (
            <div className="card bg-gradient-to-r from-green-500 to-blue-600 text-white border-none">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Quiz Complete! 🎉</h2>
                <p className="text-2xl mb-4 font-bold">
                  Score: {score} / {quiz.questions.length}
                </p>
                <p className="text-xl opacity-90 font-medium">
                  {Math.round((score / quiz.questions.length) * 100)}% Correct
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {!showResults && (
            <div className="sticky bottom-4 z-10">
              <button
                onClick={() => {
                  const answeredCount = Object.keys(selectedAnswers).length;
                  const totalCount = quiz.questions.length;
                  if (answeredCount < totalCount) {
                    if (!window.confirm(`You have answered ${answeredCount} out of ${totalCount} questions. Are you sure you want to submit?`)) {
                      return;
                    }
                  }
                  calculateScore();
                }}
                className={`w-full py-4 rounded-xl text-xl font-bold shadow-lg transition-all duration-200 ${Object.keys(selectedAnswers).length > 0
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                disabled={Object.keys(selectedAnswers).length === 0}
              >
                {Object.keys(selectedAnswers).length === quiz.questions.length
                  ? 'Submit Quiz'
                  : `Submit Quiz (${Object.keys(selectedAnswers).length}/${quiz.questions.length} Answered)`
                }
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
