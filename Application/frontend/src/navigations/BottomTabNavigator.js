import {StyleSheet, Text, View,Image} from 'react-native';
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
const highlightColor = '#4ec1a3'; // replace with your desired color


function BottomTabNavigator({route, navigation}) {

  return (
    <Tab.Navigator 
    initialRouteName="Home" 
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor:highlightColor,
      tabBarActiveBackgroundColor:'black',
    }}
    
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home', // ชื่อบน Tabbar
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../asset/home-icon.png')}
              style={{ width: size, height: size, tintColor: color }} // ตั้งค่าต่างๆตรงนี้ เช่น กว้าง สูง ฯลฯ
            />
          ),
        }}
        initialParams={{
          displayName: route.params.displayName,
          email: route.params.email,
          photo: route.params.photoURL,
          uid: route.params.uid,
        }}
      />
      <Tab.Screen 
      name="DoctorList" 
      component={DoctorListScreen} 
      // options={{ tabBarBadge:0}}
      options={{
        tabBarLabel: 'DoctorList',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('../asset/List_Icon.png')}
            style={{ width: size, height: size, tintColor: color }}
          />
        ),
      }}
      />
      {/* <Tab.Screen name="DoctorDetail" component={DoctorDetail}/> */}
      <Tab.Screen name="MainChat" component={MainChatScreen} 
      options={{
        tabBarLabel: 'MainChat',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('../asset/Chat_Icon.png')}
            style={{ width: size, height: size, tintColor: color }}
          />
        ),
      }}
      />
      <Tab.Screen name="EvaluationScreen" component={EvaluationScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} 
      options={{
        tabBarLabel: 'SettingScreen',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('../asset/Setting.png')}
            style={{ width: size, height: size, tintColor: color }}
          />
        ),
      }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({});
