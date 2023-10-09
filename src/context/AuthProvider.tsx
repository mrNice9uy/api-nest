import React, { createContext, useState } from 'react';
import { IUserAuth } from 'src/user/user.types';

type TAuth = IUserAuth & {
  refreshToken: string;
};
type TAuthContext = {
  auth?: TAuth;
  setAuth?: (user: TAuth) => void;
  refreshToken?: string;
};
export const AuthContext = createContext<TAuthContext>({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState<TAuth>({
    email: '',
    password: '',
    refreshToken: '',
  });
  const refreshToken = '';

  return (
    <AuthContext.Provider value={{ auth, setAuth, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
