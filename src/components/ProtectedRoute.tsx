import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Spinner from './Spinner';
import { isPortfolioMode } from '../config/runtime';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowPortfolio?: boolean;
}

export default function ProtectedRoute({
  children,
  allowPortfolio = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isPortfolioMode && allowPortfolio) {
    return children ? <>{children}</> : <Outlet />;
  }

  // Although App.tsx handles the initial loading, it's good practice to handle it here too
  // in case this component is used outside the main App loader context or if re-validation occurs.
  if (isLoading) {
    return <Spinner fullScreen />;
  }

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
