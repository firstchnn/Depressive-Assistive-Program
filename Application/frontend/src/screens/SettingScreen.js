import * as React from 'react';
import { Button, View, Text } from 'react-native';

function SettingScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Setting Screen</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

export default SettingScreen;