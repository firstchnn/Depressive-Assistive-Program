import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import BottomTabNavigator from './BottomTabNavigator';
import DoctorDetail from '../screens/DoctorDetail';

const Stack = createStackNavigator();

function AuthNavigator() {
    console.log(Stack)
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen 
        name="BottomNav" 
        component={BottomTabNavigator}
        options={{headerShown: false}}
        />
        <Stack.Screen name="DoctorDetail" component={DoctorDetail}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator