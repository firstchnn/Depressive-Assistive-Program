import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View} from 'react-native'
// import HomeScreen from '../screen/HomeScreen';
// // import LoginScreen from '../screen/LoginScreen';
// import UserChatScreen from '../screen/UserChatScreen';
// import DoctorListScreen from '../screen/DoctorListScreen';
// import EvaluationScreen from '../screen/EvaluationScreen';

const Tab = createBottomTabNavigator();

function BottomTabNav() {
  return (
    <>
    <View>
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Doctor" component={DoctorListScreen} />
      <Tab.Screen name="Chat" component={UserChatScreen} />
      <Tab.Screen name="Evaluation" component={EvaluationScreen} /> */}
    </Tab.Navigator>
    </View>
    </>
  );
}

export default BottomTabNav;