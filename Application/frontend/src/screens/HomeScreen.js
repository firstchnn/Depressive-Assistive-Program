import * as React from 'react';
import { Button, View, Text } from 'react-native';
// import BottomTabNav from '../components/BottomTabNav';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
      />
      {/* <BottomTabNav/> */}
    </View>
  );
}

export default HomeScreen;