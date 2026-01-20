import { useState } from 'react';
import { summarizeNotes } from '../services/api';

const NotesSummarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert('Please enter some text to summarize!');
      return;
    }

    if (text.length < 50) {
      alert('Please enter at least 50 characters for better summarization.');
      return;
    }

    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const response = await summarizeNotes(text);
      setSummary(response.data);
    } catch (err) {
      setError(err.error || 'Failed to generate summary. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          📄 Notes Summarizer
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paste your notes or text here:
            </label>
            <textarea
              placeholder="Enter your study notes, lecture content, or any text you want to summarize..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="10"
              className="input-field resize-none"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-2">
              {text.length} characters {text.length < 50 && '(minimum 50 recommended)'}
            </p>
          </div>

          <button
            onClick={handleSummarize}
            disabled={loading || !text.trim() || text.length < 50}
            className="btn-primary w-full"
          >
            {loading ? 'Summarizing...' : 'Summarize Notes'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 text-lg">AI is analyzing your notes...</p>
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

      {/* Summary Result */}
      {summary && !loading && (
        <div className="card">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              📝 Summary
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Original: {summary.originalLength} characters</span>
              <span>•</span>
              <span>Compressed: {Math.round((1 - summary.summary.length / summary.originalLength) * 100)}% reduction</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border-l-4 border-purple-500">
            <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-lg">
              {summary.summary}
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-600">
              💡 <strong>Tip:</strong> You can copy this summary and use it for quick revision or create flashcards from it!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesSummarizer;
