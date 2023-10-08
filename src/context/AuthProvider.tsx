import { createContext, useState } from 'react';
import { IUserAuth } from 'src/user/user.types';

type TAuthCintext = {
  auth?: IUserAuth;
  setAuth?: (user: IUserAuth) => void;
};
export const AuthContext = createContext<TAuthCintext>({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState<IUserAuth>({ email: '', password: '' });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
