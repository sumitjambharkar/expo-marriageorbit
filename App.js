import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import { AuthProvider } from './hooks/useAuth';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
     <StackNavigation/>
     </AuthProvider>
    </NavigationContainer>
  )
}

export default App;