import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import DoctorListScreen from '../screens/DoctorListScreen';
import UserChatScreen from '../screens/UserChatScreen';
import EvaluationScreen from '../screens/EvaluationScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Home'>
        
        <Tab.Screen name="DoctorList" component={DoctorListScreen}/>
        <Tab.Screen name="UserChat" component={UserChatScreen}/>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="EvaluationScreen" component={EvaluationScreen}/>
        <Tab.Screen name="SettingScreen" component={SettingScreen}/>
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})