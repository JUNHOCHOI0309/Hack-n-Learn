import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import AIChatBot from './components/AIChatBot';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isChallengePage = location.pathname.startsWith('/challenge') && location.pathname !== '/challenge';

  const hideAIChatBot =
    location.pathname.startsWith('/challenge/') || // For ChallengeDetailPage and ChallengeResultPage
    location.pathname === '/learning/quiz'; // For LearningPageQuiz

  return (
    <AuthProvider> {/** Wrap the content with AuthProvider */}
      <ScrollToTop />
      {!isChallengePage && <Header />}
      <Outlet />
      {!hideAIChatBot && (
        <div className="fixed bottom-8 right-8 z-50">
          <AIChatBot />
        </div>
      )}
    </AuthProvider>
  );
}