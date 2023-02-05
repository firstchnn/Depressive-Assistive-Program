import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Text, Button, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// import io from 'socket.io-client'

function MainChatScreen({navigation}) {
    const nav = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{paddingBottom: '20%'}}>
      <Text>Main Chat Screen</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column'}}>
      <Text>Button 1</Text>
      <Button
        title="Speaker"
        onPress={() => nav.navigate('UserChat', { role: 'Speaker' })}
      />
      </View>
      <View style={{width: '10%'}}></View>
      <View style={{width: 3, backgroundColor: 'black'}} />
      <View style={{width: '10%'}}></View>
      <View style={{flexDirection: 'column',}}>
      <Text>Button 2</Text>
      <Button
        title="Listener"
        onPress={() => nav.navigate('UserChat', { role: 'Listener' })}
      />
      </View>
    </View>
    </View>
  );
}

export default MainChatScreen;
