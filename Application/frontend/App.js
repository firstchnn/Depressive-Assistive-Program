
// import {React, useState} from 'react';
// import {
//   Button,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import { createStackNavigator, createAppContainer , NavigationContainer} from '@react-navigation/stack';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HomeScreen from './screen/HomeScreen.js';
// import LoginScreen from './screen/LoginScreen.js';

// import styles from './styles.js'

// /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
//  * LTI update could not be added via codemod */
// const AppNavigator = createNativeStackNavigator()
// // const AppContainer = createAppContainer(AppNavigator)
// function App(){
//   // const [isLogin,setIsLogin] = useState(false)
//   // const handleClick = () => {
//   //   setIsLogin(!isLogin)
//   // }
//   return (
//     <NavigationContainer>
//       <AppNavigator.Navigator initialRouteName= "Home">
//         <AppNavigator.screen name="Home" component={HomeScreen}/>
//         <AppNavigator.screen name="Login" component={LoginScreen}/>
//       </AppNavigator.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App


import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;