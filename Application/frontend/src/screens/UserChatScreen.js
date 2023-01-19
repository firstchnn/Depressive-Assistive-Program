import React, { useState, useRef, useEffect }from 'react';
import { View, TextInput, Text, Button, FlatList } from 'react-native';

function UserChatScreen({navigation}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const randomAnswer = ['Nice','Thanks','Great','Cool','I see']
  const flatListRef = useRef(null);

  const handleSend = () => {
    setMessages(prevMessages => [...prevMessages, {text:newMessage,fromSender:true}]);
    setTimeout(()=>{
        setMessages(prevMessages => [...prevMessages, {text:randomAnswer[Math.floor(Math.random() * randomAnswer.length)],fromSender:false}]);
    },1000);
    setNewMessage('');
  };

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={{ padding: 10, margin: 10, alignSelf: item.fromSender ? 'flex-end':'flex-start', backgroundColor: 'lightgray' }}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
        <TextInput
          style={{ flex: 1, padding: 10 }}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message here"
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
}

export default UserChatScreen;