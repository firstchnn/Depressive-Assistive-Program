import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// import io from 'socket.io-client'

function MainChatScreen({navigation}) {
  const nav = useNavigation();

  const textSets = [
    'Text set 1',
    'Text set 2',
    'Text set 3',
    'Text set 4',
    'Text set 5',
  ];

  const [currentTextSet, setCurrentTextSet] = useState('');
  const [previousTextSetIndex, setPreviousTextSetIndex] = useState(null);
  const generateRandomTextSet = () => {
    let randomIndex = Math.floor(Math.random() * textSets.length);
    while (randomIndex === previousTextSetIndex) {
      randomIndex = Math.floor(Math.random() * textSets.length);
    }
    setCurrentTextSet(textSets[randomIndex]);
    setPreviousTextSetIndex(randomIndex);
    console.log(currentTextSet);
  }

  useEffect(() => {
    generateRandomTextSet();
  }, []);
  
  useEffect(() => {    //get navigation state if focus or enter this screen app will random text set
    const unsubscribe = navigation.addListener('focus', () => {
      generateRandomTextSet();
    });
  
    return unsubscribe;
  }, [navigation]);


  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{}}>
        <Image
          style={{
            alignSelf: 'center',
            marginBottom: 70,
            // paddingTop:10,
            borderWidth: 3,
            borderColor: 'red',
          }}
          source={require('../asset/Mainchat.png')}></Image>
        <Text
          style={{
            alignSelf: 'center',
            // alignItems:'center',
            textAlign:'center',
            marginBottom: 30,
            paddingStart: 50,
            paddingEnd: 50,
          }}>
          {currentTextSet}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 3,
          borderColor: 'blue',
          // marginTop: 15,
          // marginBottom:25
          paddingBottom:25,
          paddingTop:15,
          paddingHorizontal:15
        }}>
        <View
          style={{
            flexDirection: 'column',
            borderWidth: 3,
            borderColor: 'lightblue',
          }}>
          <Text
            style={{
              alignSelf: 'center',
            }}>
            Button 1
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: '#A3E4D7',
              paddingRight: 30,
              paddingLeft: 30,
              paddingBottom: 10,
              paddingTop: 10,
            }}
            onPress={() => nav.navigate('UserChat', {role: 'Speaker'})}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                color: '#242424',
              }}>
              Speaker
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '10%'}}></View>
        <View style={{width: 1.5, backgroundColor: '#00C7D4'}} />
        <View style={{width: '10%'}}></View>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              alignSelf: 'center',
            }}>
            Button 2
          </Text>
          {/* <Button
            title="Listener"
            onPress={() => nav.navigate('UserChat', {role: 'Listener'})}
          /> */}
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: '#A3E4D7',
              paddingRight: 30,
              paddingLeft: 30,
              paddingBottom: 10,
              paddingTop: 10,
            }}
            onPress={() => nav.navigate('UserChat', {role: 'Listener'})}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                color: '#242424',
              }}>
              Listener
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MainChatScreen;
