import { useNavigate } from 'react-router';
import { logoutUser } from 'src/pages/LoginPage/LoginPage.api';
import { useAuth } from './useAuth';

export const useLogout = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const handleLogout = async () => {
    await logoutUser(undefined, { withCredentials: true });
    setAuth({ ...auth, refreshToken: '' });
    navigate('/login');
  };

  return {
    handleLogout,
  };
};
