import {StyleSheet, Text, View,Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import DoctorSettingScreen from '../screens/DoctorSettingScreen';

 
const Tab = createBottomTabNavigator();
const highlightColor = '#4ec1a3'; // replace with your desired color


function DoctorNav({route, navigation}) {

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
      />
      
      <Tab.Screen name="DoctorSettingScreen" component={DoctorSettingScreen} 
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

export default DoctorNav;

const styles = StyleSheet.create({});
