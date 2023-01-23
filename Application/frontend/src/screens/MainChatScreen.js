import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Text, Button, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// import io from 'socket.io-client'

function MainChatScreen({navigation}) {
    const nav = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Main Chat Screen</Text>
      <Button
        title="Speaker"
        onPress={() => nav.navigate('UserChat', { role: 'Speaker' })}
      />
      <Button
        title="Listener"
        onPress={() => nav.navigate('UserChat', { role: 'Listener' })}
      />
    </View>
  );
}

export default MainChatScreen;
