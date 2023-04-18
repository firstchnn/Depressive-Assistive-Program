import {StyleSheet, Text, View,Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import DoctorSettingScreen from '../screens/DoctorSettingScreen';
import DoctorHomepage from '../screens/DoctorHomepage';

 
const Tab = createBottomTabNavigator();
const highlightColor = '#2450fc'; // replace with your desired color


function DoctorNav({route, navigation}) {

  return (
    <Tab.Navigator 
    initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: highlightColor,
        // tabBarActiveBackgroundColor: 'black',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          marginBottom: 8,
          padding: 0,
        },
    }}
    
    >
      <Tab.Screen
        name="Management"
        component={DoctorHomepage}
        options={{
          tabBarLabel: 'Home', // ชื่อบน Tabbar
          headerShown:'false',
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
