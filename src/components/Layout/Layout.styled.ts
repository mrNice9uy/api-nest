import styled from 'styled-components';

import { Link } from 'react-router-dom';

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
