import 'react-native-reanimated'
import 'react-native-gesture-handler'

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';

import { AuthProvider } from '@hooks/auth';

import { Welcome } from '@screens/Welcome';

import theme from './src/theme'

export default function App() {
  const [ fontsLoaded ] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar 
          style='dark'
          translucent
          backgroundColor='transparent'
        />
        <AuthProvider>
          <Welcome />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
