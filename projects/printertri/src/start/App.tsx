import React from 'react';
import { registerRootComponent } from 'expo';

import { Home } from '../screens/app/Home';

export default function App() {
  return (
    <Home />
  );
}

registerRootComponent(App);
