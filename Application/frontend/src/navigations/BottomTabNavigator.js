import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DoctorListScreen from '../screens/DoctorListScreen';
import UserChatScreen from '../screens/UserChatScreen';
import EvaluationScreen from '../screens/EvaluationScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator({route, navigation}) {
  // useEffect(() => {
  //   console.log('from bottom-tabNavigator navigate to home with ',route.params)
  //   navigation.navigate('Home')
  // },[navigation])
  // console.log('this is a bottom tab ',route.params);
  // const [userData, setUserData] = useState({});
  // const getData = async data => {
  // await console.log('this is a bottom tab');
  //   const loginParam = data.params;
  //   await setUserData(loginParam);
  //   await console.log(userData);
  // };
  // useEffect(() => {
  //   getData(route);
  // });

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen name="DoctorList" component={DoctorListScreen} />
      <Tab.Screen name="UserChat" component={UserChatScreen} />
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
      <Tab.Screen name="EvaluationScreen" component={EvaluationScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({});
