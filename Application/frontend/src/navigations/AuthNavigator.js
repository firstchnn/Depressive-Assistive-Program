import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import BottomTabNavigator from './BottomTabNavigator';
import DoctorDetail from '../screens/DoctorDetail';
import UserChatScreen from '../screens/UserChatScreen';
import VideoCall from '../screens/VideoCall';
import ScoreScreen from '../screens/ScoreScreen';
import HomeScreen from '../screens/HomeScreen';

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
        <Stack.Screen name="UserChat" component={UserChatScreen}/>
        <Stack.Screen name="VideoCall" component={VideoCall}/>
        <Stack.Screen name="ScoreScreen" component={ScoreScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator