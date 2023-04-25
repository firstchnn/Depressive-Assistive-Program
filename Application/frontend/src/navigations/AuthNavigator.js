import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import BottomTabNavigator from './BottomTabNavigator';
import DoctorDetail from '../screens/DoctorDetail';
import UserChatScreen from '../screens/UserChatScreen';
import VideoCall from '../screens/VideoCall';
import ScoreScreen from '../screens/ScoreScreen';
import HomeScreen from '../screens/HomeScreen';
import PaymentScreen from '../screens/PaymentScreen';
import DoctorNav from './DoctorNav';
import SetTimeScreen from '../screens/SetTimeScreen';
import DoctorHomepage from '../screens/DoctorHomepage';
import VideoCallScreen from '../screens/VideoCallScreen';
import AppointmentDetail from '../screens/AppointmentDetail';
import DoctorAppointmentDetail from '../screens/DoctorAppointmentDetail';

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
        <Stack.Screen 
        name="DocNav" 
        component={DoctorNav}
        options={{headerShown: false}}
        />
        <Stack.Screen name="DoctorDetail" component={DoctorDetail} options={{headerShown: false}}/>
        <Stack.Screen name="UserChat" component={UserChatScreen} 
        options={{headerShown: false}}
        // options={{headerBackTitle:"Back"}}
        />
        <Stack.Screen name="VideoCall" component={VideoCall}/>
        <Stack.Screen name="ScoreScreen" component={ScoreScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen name="SetTimeScreen" component={SetTimeScreen} 
        options={{headerShown: false}}
        />
        {/* <Stack.Screen name="DoctorHomepage" component={DoctorHomepage}
        options={{headerShown: false}}
        /> */}
        <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AppointmentDetail" component={AppointmentDetail} options={{headerShown: false}}/>
        <Stack.Screen name="DoctorAppointmentDetail" component={DoctorAppointmentDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator