import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';
import { Layout } from '../Layout/Layout';

export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.email ? (
    <Layout />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
