import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { ServicePage } from './pages/ServicePage';
import { UsersPage } from './pages/UsersPage';
import { LoginForm, RegistrationForm } from './pages/LoginPage';
import { RequireAuth } from './components/RequireAuth';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        {/* protected  */}
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
