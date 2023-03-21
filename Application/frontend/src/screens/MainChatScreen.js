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
    'สนทนาด้วยความเคารพ',
    'รับฟัง/พูดคุย ด้วยความเข้าใจ',
    'เห็นใจซึ่งกันและกัน',
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
            marginBottom: 35,
            // paddingTop:10,
            borderWidth: 0,
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
          borderWidth: 0,
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
            borderWidth: 0,
            borderColor: 'lightblue',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              textAlign:'center',
              marginBottom:80,
            }}>
            ฉันมีเรื่องที่ {'\n'}อยากจะระบาย
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: '#F8C5F9',
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
              ระบาย
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '10%'}}></View>
        <View style={{width: 1.2, backgroundColor: '#00C7D4'}} />
        <View style={{width: '10%'}}></View>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              alignSelf: 'center',
              textAlign:'center',
              marginBottom:80,
            }}>
            ฉันพร้อม{'\n'}ที่จะรับฟังผู้อื่น
          </Text>
          {/* <Button
            title="Listener"
            onPress={() => nav.navigate('UserChat', {role: 'Listener'})}
          /> */}
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: '#cae1fb',
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
              รับฟัง
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MainChatScreen;
