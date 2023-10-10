import { useNavigate } from 'react-router';
import { logoutUser } from 'src/pages/LoginPage/LoginPage.api';

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser(undefined, { withCredentials: true });
    navigate('/login');
  };

  return {
    handleLogout,
  };
};
