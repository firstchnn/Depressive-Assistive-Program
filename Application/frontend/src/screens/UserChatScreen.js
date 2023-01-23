import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Text, Button, FlatList} from 'react-native';
import io from 'socket.io-client';

function UserChatScreen({navigation,route}) {
  const role = route.params.role;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to socket.io server
    const newSocket = io('http://192.168.1.5:3000');
    setSocket(newSocket);
    console.log('Connected to socket');

    // Cleanup function to disconnect from socket.io server when component unmounts
    return () => {
      newSocket.disconnect();
      console.log('Disconnected to socket');
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('chat message', (response) => {
        if(response.role !== role)
        setMessages(prevMessages => [
          ...prevMessages,
          {text: response.message, fromSender: false},
        ]);
      });
    }
  }, [socket]);

  const handleSend = (role) => {
    setMessages(prevMessages => [
      ...prevMessages,
      {text: newMessage, fromSender: true, role},
    ]);
    socket.emit('chat message', {message: newMessage, role});
    setNewMessage('');
  };

  useEffect(() => {
    flatListRef.current.scrollToEnd({animated: true});
  }, [messages]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <Text>{role}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({item}) => (
          <View
            style={{
              padding: 10,
              margin: 10,
              alignSelf: item.fromSender ? 'flex-end' : 'flex-start',
              backgroundColor: 'lightgray',
            }}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <TextInput
          style={{flex: 1, padding: 10}}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message here"
        />
        <Button title="Send" onPress={() => handleSend(role)} />
      </View>
    </View>
  );
}

export default UserChatScreen;
