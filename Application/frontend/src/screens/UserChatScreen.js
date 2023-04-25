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
    const newSocket = io('https://ce22.onrender.com/');
    setSocket(newSocket);
    console.log('Connected to socket');

    return () => {
      newSocket.disconnect();
      console.log('Disconnected to socket');
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('chat message', response => {
        if (response.role !== role) {
          setMessages(prevMessages => [
            ...prevMessages,
            {text: response.message, fromSender: false},
          ]);
        }
      });
    }
  }, [socket]);

  const handleSend = role => {
    if (newMessage.trim() !== '') {
      setMessages(prevMessages => [
        ...prevMessages,
        {text: newMessage, fromSender: true, role},
      ]);
      socket.emit('chat message', {message: newMessage, role});
      setNewMessage('');
    }
  };

  useEffect(() => {
    flatListRef.current.scrollToEnd({animated: true});
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../asset/BackBTN.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        {/* <Text style={{marginRight:80}}>{role}</Text> */}
      </View>
      <View style={styles.disclaimerContainer}>
        <Image
          source={require('../asset/Exclamation.png')}
          style={styles.disclaimerIcon}
        />
        <Text style={styles.disclaimerText}>
          เราให้ความสำคัญกับข้อมูลส่วนบุคคลของผู้ใช้งาน
          กรุณารักษารักษาข้อมูลส่วนบุคคล {'\n'}และอย่ามอบข้อมูล
          ของท่านแก่บุคคลอื่น
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageContainer,
              {alignSelf: item.fromSender ? 'flex-end' : 'flex-start'},
              {backgroundColor: item.fromSender ? '#9FC5E8' : '#F0B0C0'},
            ]}>
            <Text
              style={[
                styles.messageText,
                {
                  alignItems: item.fromSender ? 'flex-end' : 'flex-start',
                  color: 'black',
                },
              ]}>
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message here"
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleSend(role)}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  disclaimerIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 8,
    color: '#777',
    lineHeight: 20,
    alignSelf: 'center',
  },
  messageContainer: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxWidth: '80%',
    marginVertical: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    borderRadius: 20,
    color: 'black',
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default UserChatScreen;
