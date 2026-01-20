import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explanation from './pages/Explanation';
import NotesSummarizer from './pages/NotesSummarizer';
import QuizGenerator from './pages/QuizGenerator';
import Flashcards from './pages/Flashcards';
import AITutor from './pages/AITutor';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explain" element={<Explanation />} />
          <Route path="/summarize" element={<NotesSummarizer />} />
          <Route path="/quiz" element={<QuizGenerator />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/tutor" element={<AITutor />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
