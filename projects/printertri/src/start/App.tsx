import React from 'react';
import { ActivityIndicator } from 'react-native';
import { registerRootComponent } from 'expo';
import { ThemeProvider } from 'styled-components';
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto';

import theme from '../styles/theme'

import { Home } from '../screens/app/Home';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <ThemeProvider theme={theme}>
      {
        fontsLoaded ? <Home/> : <ActivityIndicator/>
      }
    </ThemeProvider>
  );
}

registerRootComponent(App);
