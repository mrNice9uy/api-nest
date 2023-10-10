import React from 'react';
import { useAuth } from 'src/hooks/useAuth';

export const HomePage = () => {
  const { auth } = useAuth();
  return (
    <div style={{ padding: '0 0 24px 24px' }}>
      <h1>Home</h1>
      <p>Hello {auth.email}!</p>
    </div>
  );
};
