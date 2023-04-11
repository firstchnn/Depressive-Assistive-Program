import * as React from 'react';
import { useEffect } from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from './src/navigations/AuthNavigator';
import { UserContext } from './src/components/UserContext';
import {useNavigation} from '@react-navigation/native';

// const Stack = createNativeStackNavigator();

function App() {
  const [userData, setUserData] = React.useState(null);  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
