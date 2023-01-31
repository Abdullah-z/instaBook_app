import 'react-native-gesture-handler';
import React from 'react';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import {NativeBaseProvider} from 'native-base';

export default function App() {
  return (
    <DataProvider>
      <NativeBaseProvider>
        <AppNavigation />
      </NativeBaseProvider>
    </DataProvider>
  );
}
