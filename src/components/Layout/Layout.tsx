import React from 'react';
import { Outlet } from 'react-router-dom';

import * as Styled from './Layout.styled';

export const Layout = () => (
  <>
    <Styled.Header>
      <Styled.Item to="/">Home</Styled.Item>
      <Styled.Item to="/services">Services</Styled.Item>
      <Styled.Item to="/users">Users</Styled.Item>
    </Styled.Header>
    <Outlet />
  </>
);
