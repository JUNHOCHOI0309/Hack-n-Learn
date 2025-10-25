
import { Routes, Route } from 'react-router-dom';
import LearningPageDetail from './pages/LearningPageDetail';
import LearningPageQuiz from './pages/LearningPageQuiz';
import LearningPageQuizResult from './pages/LearningPageQuizResult';
import PracticalProblemsPage from './pages/PracticalProblemsPage';
import LearningPageMain from './pages/LearningPageMain';

import PracticalProblemsDetailPage from './pages/PracticalProblemsDetailPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LearningPageMain />} />
      <Route path="/learning-detail" element={<LearningPageDetail />} />
      <Route path="/learningPageQuiz" element={<LearningPageQuiz />} />
      <Route path="/quiz-results" element={<LearningPageQuizResult />} />
      <Route path="/practical-problems" element={<PracticalProblemsPage />} />
      <Route path="/practical-problems/:id" element={<PracticalProblemsDetailPage />} />
    </Routes>
  );
}
