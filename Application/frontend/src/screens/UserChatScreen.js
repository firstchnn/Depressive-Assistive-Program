import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import io from 'socket.io-client';

function UserChatScreen({navigation, route}) {
  const role = route.params.role;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to socket.io server
    const newSocket = io('https://ce22.onrender.com/');
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
      socket.on('chat message', response => {
        if (response.role !== role)
          setMessages(prevMessages => [
            ...prevMessages,
            {text: response.message, fromSender: false},
          ]);
      });
    }
  }, [socket]);

  const handleSend = role => {
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.Back_BTN}>
        <Image
          source={require('../asset/BackBTN.png')}
          style={styles.Back_Icon}></Image>
        <Text style={{fontSize: 16, alignItems: 'center'}}>Back</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-evenly',
        }}>
        {/* <Text>{role}</Text> */}
        <Image
          source={require('../asset/Exclamation.png')}
          style={{
            resizeMode: 'contain',
            width: 30,
            height: 30,
            alignSelf: 'center',
          }}></Image>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: 'Kanit-Regular',
            marginLeft: 10,
            fontSize:12,
          }}>
          เราให้ความสำคัญกับข้อมูลส่วนบุคคลของผู้ใช้งาน{'\n'}
          กรุณารักษารักษาข้อมูลส่วนบุคคล และอย่ามอบข้อมูล{'\n'}
          ของท่านแก่บุคคลอื่น
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({item}) => (
          <View
            style={{
              padding: 10,
              margin: 10,
              width: 'auto',
              maxWidth: '70%',
              alignSelf: item.fromSender ? 'flex-end' : 'flex-start',
              // backgroundColor: item.fromSender ? '#F0B0C0' : '#9FC5E8',
              backgroundColor: item.fromSender ? '#9FC5E8' : '#F0B0C0',
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Kanit-Regular',
                fontSize: 16,
                alignItems: item.fromSender ? 'flex-end' : 'flex-start',
              }}>
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          borderRadius: 8,
        }}>
        <TextInput
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 4,
            marginRight: 2,
            borderRadius: 8,
            borderWidth: 0.6,
          }}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message here"
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#82E7C9',
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
          onPress={() => handleSend(role)}>
          <Text style={{fontFamily: 'Kanit-Regular'}}>SEND</Text>
        </TouchableOpacity>
        {/* <Button title="Send" onPress={() => handleSend(role)} /> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Back_BTN: {
    flexDirection: 'row',
    // borderWidth: 1,
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 15,
  },
  Back_Icon: {
    // backgroundColor:'green',
    width: 30,
    height: 30,
    borderRadius: 100,
    marginTop: 0,
    marginHorizontal: 10,
  },
});
export default UserChatScreen;
