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
          อะวิกกระดี๊กระด๊าสหัสวรรษ เป่ายิงฉุบซินโดรม สเปก เฟอร์รี่ แฟนตาซี
          จิตพิสัยออร์แกน ลาเต้อัตลักษณ์ บร็อกโคลีโปรเจคท์อัลบั้ม เสือโคร่งบรา
          ฮากกาฟิวเจอร์อพาร์ทเมนท์ เปราะบางคลาสสิกรามาธิบดีโฮลวีต
          เช็กวอร์รูมเสกสรรค์แบรนด์ดีไซน์เนอร์
          เพทนาการซาดิสต์โอวัลตินละอ่อนเอเซีย ฮีโร่ดิสเครดิตสวีทคอนเซ็ปต์
          สหัสวรรษนายแบบดีพาร์ทเมนต์ เวอร์เก๊ะโปรเจ็คตี๋ลิสต์
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
          {/* <Button
            title="Speaker"
            onPress={() => nav.navigate('UserChat', {role: 'Speaker'})}
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
