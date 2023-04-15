import * as React from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function SettingScreen({navigation}) {
  return (
    <View>
      <Text style={{alignSelf:'center',}}>Test doctor page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  SwitchAccount: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1095B5',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 4,
    // marginTop: 2 * vh,
    // height: 6 * vh,
  },
});

export default SettingScreen;
