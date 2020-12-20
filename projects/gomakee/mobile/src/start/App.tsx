import { registerRootComponent } from 'expo';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from '../routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#7159c1"
        translucent
      />
      <View style={{ flex: 1, backgroundColor: '#7159c1' }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

registerRootComponent(App);

export default App;
