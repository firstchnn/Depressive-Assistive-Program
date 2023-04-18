import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
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
const highlightColor = '#2450fc'; // replace with your desired color

function BottomTabNavigator({route, navigation}) {
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
        // tabBarItemStyle:{
        //   borderRadius: 24, // set the desired border radius here
        // }
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home', // ชื่อบน Tabbar
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../asset/home-icon.png')}
              style={{width: size, height: size, tintColor: color}} // ตั้งค่าต่างๆตรงนี้ เช่น กว้าง สูง ฯลฯ
            />
          ),
          headerShown: false // set headerShown to false for the "Home" screen
        }}
      />
      <Tab.Screen
        name="DoctorList"
        component={DoctorListScreen}
        // options={{ tabBarBadge:0}}
        options={{
          tabBarLabel: 'DoctorList',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../asset/List_Icon.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      {/* <Tab.Screen name="DoctorDetail" component={DoctorDetail}/> */}
      <Tab.Screen
        name="MainChat"
        component={MainChatScreen}
        options={{
          tabBarLabel: 'MainChat',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../asset/Chat_Icon.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PHQ-9"
        component={EvaluationScreen}
        options={{
          tabBarLabel: 'PHQ-9',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../asset/PHQ9.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../asset/Setting.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
    // </View>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({});
