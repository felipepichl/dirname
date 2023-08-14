import { StatusBar } from 'expo-status-bar';

import { SignIn } from '@screens/SignIn';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        style='light'
        translucent
        backgroundColor='transparent'
        />
      <SignIn />
    </ThemeProvider>
  );
}
