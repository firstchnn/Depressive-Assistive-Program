import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DoctorListScreen from '../screens/DoctorListScreen';
import UserChatScreen from '../screens/UserChatScreen';
import EvaluationScreen from '../screens/EvaluationScreen';
import SettingScreen from '../screens/SettingScreen';
import test from '../screens/DoctorDetail';
import DoctorDetail from '../screens/DoctorDetail';
import MainChatScreen from '../screens/MainChatScreen';
 
const Tab = createBottomTabNavigator();

function BottomTabNavigator({route, navigation}) {

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{
          displayName: route.params.displayName,
          email: route.params.email,
          photo: route.params.photoURL,
          uid: route.params.uid,
        }}
      />
      <Tab.Screen name="DoctorList" component={DoctorListScreen} />
      {/* <Tab.Screen name="DoctorDetail" component={DoctorDetail}/> */}
      <Tab.Screen name="MainChat" component={MainChatScreen} />
      
      <Tab.Screen name="EvaluationScreen" component={EvaluationScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({});
