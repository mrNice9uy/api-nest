import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282c34;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 18px;
  padding: 24px;
  background-color: #282c34;
`;

export const Item = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 800;
`;

export const Logout = styled.button`
  border: none;
  border-radius: 4px;
  outline: none;
  background: #61dafb;
  color: #282c34;
  font-size: 18px;
  font-weight: 800;
  margin: 24px;
  cursor: pointer;
`;
