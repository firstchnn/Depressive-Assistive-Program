import React, {useEffect, useState, useLayoutEffect, version} from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Icon,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
  TextInput,
  StyleSheet,
  AppState,
  // Pressable,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import CardHome from '../components/CardHome';
import {MaterialIcons} from '@expo/vector-icons';
import {UserContext} from '../components/UserContext';
function HomeScreen({navigation, route}) {
  const {width: viewportWidth} = Dimensions.get('window');
  const {height: viewportHeight} = Dimensions.get('window');
  const vw = viewportWidth / 100;
  const vh = viewportHeight / 100;

  const [searchText, setSearchText] = useState('');
  const {userData} = React.useContext(UserContext);
  const [data, setData] = useState(null);
  const [currData, setCurrData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [appointData, setAppointmentData] = useState(false);
  const isFocused = useIsFocused();

  const banner = [
    'https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/415368/pexels-photo-415368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1126379/pexels-photo-1126379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  const {width} = Dimensions.get('window').width;
  const {height} = Dimensions.get('window').height;
  const [imgActive, setimgActive] = useState(0);
  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const imageIndex = Math.floor(contentOffset.x / (70 * vw));
    setimgActive(imageIndex);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://ce22.onrender.com/singleUser/${userData.email}`,
      );
      const json = await response.json();
      setData(json);
      // setCurrData(json.appointment);
      // console.log(json.appointment.length);
      if (json.appointment.length >= 2) {
        setAppointmentData(true);
        console.log('there is not appointment data available');
        json.appointment.shift();
        setCurrData(json.appointment);
      } else {
        console.log(json.appointment.length, ' is equal or less than 1');
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  onchange = nativeEvent => {};

  useEffect(() => {
    if (isFocused) {
      // user has returned to this screen
      console.log('User returned to this screen');
      fetchData();
    }
  }, [isFocused]);

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: 0,
          borderWidth: 0,
          borderColor: 'red',
          flexDirection: 'column',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10,
            marginTop: 20,
            borderColor: 'green',
            borderWidth: 0,
          }}
          onPress={() => navigation.navigate('MainChat')}>
          <Image
            style={{
              alignSelf: 'center',
              width: 200,
              height: 140,
              marginRight: 20,
            }}
            source={require('../asset/Helping_Hand.png')}></Image>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: 'black',
                alignSelf: 'center',
                marginRight: 20,
                marginBottom: 15,
                fontFamily: 'Kanit-Regular',
              }}>
              เริ่มต้นการสนทนา
            </Text>
            <Image
              style={{alignSelf: 'center'}}
              source={require('../asset/arrow_right.png')}></Image>
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'flex-start',
            margin: 1,
            borderColor: 'blue',
            borderWidth: 0,
            flexDirection: 'row',
            marginBottom: 8,
          }}>
          <View style={{marginVertical: 0, borderWidth: 0}}>
            <ScrollView
              horizontal
              pagingEnabled
              contentContainerStyle={{alignItems: 'center'}}
              onScroll={handleScroll}>
              <View
                style={{
                  width: Math.floor(70 * vw),
                  height: 120,
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginLeft: 15 * vw,
                  marginRight: 30 * vw,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 8,
                  }}
                  source={{uri: banner[0]}}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                />
              </View>
              <View
                style={{
                  width: Math.floor(70 * vw),
                  height: 120,
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 8,
                  }}
                  source={{uri: banner[1]}}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                />
              </View>
              <View
                style={{
                  width: Math.floor(70 * vw),
                  height: 120,
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginLeft: 30 * vw,
                  marginRight: 15 * vw,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 8,
                  }}
                  source={{uri: banner[2]}}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                />
              </View>
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              {banner.map((e, index) => (
                <Text
                  key={e}
                  style={
                    imgActive == index
                      ? {
                          margin: 3,
                          color: '#CCCCCC',
                          fontSize: 24,
                          alignSelf: 'center',
                        }
                      : {
                          margin: 3,
                          color: '#333333',
                          fontSize: 18,
                          alignSelf: 'center',
                        }
                  }>
                  •
                </Text>
              ))}
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Kanit-Regular',
            color: 'black',
          }}>
          นัดหมายของฉัน
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 12,
            maxHeight: 400,
            borderWidth: 0,
          }}>
          {!appointData ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'black', fontFamily: 'Kanit-Regular'}}>
                ไม่พบการนัดหมาย {appointData}
              </Text>
            </View>
          ) : (
            <FlatList
              data={currData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AppointmentDetail', {
                      name: item.doctorName,
                      day: item.day,
                      time: item.time,
                    })
                  }>
                  <CardHome>
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          fontFamily: 'Kanit-Bold',
                          alignSelf: 'flex-start',
                          color: 'black',
                        }}>
                        {item.doctorName.length > 15
                          ? item.doctorName.substr(0, 15) + '...'
                          : item.doctorName}
                      </Text>
                      <Text
                        style={{fontFamily: 'Kanit-Regular', color: 'black'}}>
                        {item.day}
                      </Text>
                      <Text
                        style={{fontFamily: 'Kanit-Regular', color: 'black'}}>
                        {item.time}
                      </Text>
                    </View>
                  </CardHome>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
}

export default HomeScreen;
