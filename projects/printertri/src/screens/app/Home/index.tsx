import React from 'react';

import { Header } from '../../../components/Header';

import { 
  Container, 
  Title
} from './styles';

export function Home() {
  return (
    <Container>
      <Header />
      <Title>HOME</Title>
    </Container>
  )
}