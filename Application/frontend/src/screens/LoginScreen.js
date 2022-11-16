import * as React from 'react';
import { Button, View, Text } from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
      {/* <TouchableOpacity/> */}
      <Button
        title="Continue as guest"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Continue with gmail"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default LoginScreen;