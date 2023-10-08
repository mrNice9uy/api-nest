import React from 'react';
import { Button } from 'antd';
import * as Styled from './ServicePage.styled';
import { useServicePage } from './useServicePage';

export const ServicePage = () => {
  const { values } = useServicePage();

  console.log('val', values);
  return (
    <Styled.Container>
      <Button type="primary" onClick={() => console.log('add')}>
        Добавить услугу
      </Button>
      <h1>Services</h1>
      <p>Content</p>
    </Styled.Container>
  );
};
