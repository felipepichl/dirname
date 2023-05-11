import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from './styles';

export function Header() {
  return (
    <>
      <StatusBar 
        translucent
        barStyle='light-content'
        backgroundColor='transparent'
        />
      <Container />
    </>
  )
}