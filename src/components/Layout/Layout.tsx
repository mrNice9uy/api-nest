import React from 'react';
import { Outlet } from 'react-router-dom';

import { useLogout } from 'src/hooks/useLogout';
import * as Styled from './Layout.styled';

export const Layout = () => {
  const { handleLogout } = useLogout();

  return (
    <>
      <Styled.HeaderContainer>
        <Styled.Header>
          <Styled.Item to="/">Home</Styled.Item>
          <Styled.Item to="/services">Services</Styled.Item>
          <Styled.Item to="/users">Users</Styled.Item>
        </Styled.Header>
        <Styled.Logout onClick={handleLogout}>Logout</Styled.Logout>
      </Styled.HeaderContainer>
      <Outlet />
    </>
  );
};
