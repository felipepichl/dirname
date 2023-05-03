import React from 'react';
import { registerRootComponent } from 'expo';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme'

import { Home } from '../screens/app/Home';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

registerRootComponent(App);
