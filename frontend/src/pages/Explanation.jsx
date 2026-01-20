import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { explainTopic } from '../services/api';

const Explanation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(location.state?.topic || '');
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExplain = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic!');
      return;
    }

    setLoading(true);
    setError(null);
    setExplanation(null);

    try {
      const response = await explainTopic(topic);
      setExplanation(response.data);
    } catch (err) {
      setError(err.error || 'Failed to generate explanation. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.topic && !explanation) {
      handleExplain();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          📖 Get Explanation
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter topic to explain..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleExplain()}
            className="input-field text-lg"
            disabled={loading}
          />

          <button
            onClick={handleExplain}
            disabled={loading || !topic.trim()}
            className="btn-primary w-full"
          >
            {loading ? 'Generating Explanation...' : 'Explain Topic'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 text-lg">AI is thinking...</p>
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

      {/* Explanation Result */}
      {explanation && !loading && (
        <div className="card">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {explanation.topic}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Generated on {new Date(explanation.timestamp).toLocaleString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border-l-4 border-blue-500">
              <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-lg">
                {explanation.explanation}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate('/quiz', { state: { topic: explanation.topic } })}
              className="btn-secondary"
            >
              Generate Quiz for this Topic
            </button>
            <button
              onClick={() => navigate('/flashcards', { state: { topic: explanation.topic } })}
              className="btn-secondary"
            >
              Create Flashcards
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explanation;
