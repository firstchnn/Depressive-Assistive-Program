import React, {useEffect, useState, useLayoutEffect} from 'react';
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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CardHome from '../components/CardHome';
import {MaterialIcons} from '@expo/vector-icons';
import {UserContext} from '../components/UserContext';
// import { Calendar } from 'react-native-calendars';

function DoctorHomepage({navigation}) {
  const {width: viewportWidth} = Dimensions.get('window');
  const {height: viewportHeight} = Dimensions.get('window');
  const vw = viewportWidth / 100;
  const vh = viewportHeight / 100;

  const [searchText, setSearchText] = useState('');
  const handleTextChange = text => {
    setSearchText(text);
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name.includes(text)) {
        temp.push(data[i]);
      }
    }
    setCurrData(temp);
  };
  const filteredData =
    data &&
    data.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  const renderItem = ({item}) => (
    <View>
      <Text style={{color: 'black'}}>{item.name}</Text>
    </View>
  );
  const [search, setSearch] = useState('');

  const {userData, setUserData} = React.useContext(UserContext);
  const [data, setData] = useState(null);
  const [currData, setCurrData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [appointData, setAppointmentData] = useState(false);

  const styles = StyleSheet.create({
    Search_Bar: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2 * vh,
      height: 6 * vh,
    },
    Text_Input: {
      borderColor: 'black',
      borderWidth: 0,
      borderRadius: 32,
      width: 85 * vw,
      paddingLeft: 4 * vw,
      paddingRight: 13 * vw,
      marginTop: 1 * vh,
      fontFamily: 'Kanit-Regular',
    },
    search_Icon: {
      position: 'absolute',
      right: 50,
      top: 15,
      height: 20,
      width: 20,
    },
  });

  const fetchData = async () => {
    console.log('enter Docter Home Page')
    console.log(userData);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://ce22.onrender.com/singledoc/${userData.email}`,
      );
      const json = await response.json();
      setData(json);
      if (json.appointment.length >= 2) {
        setAppointmentData(true);
        console.log('there is not appointment data available');
        json.appointment.shift();
        setCurrData(json.appointment);
      } else {
        console.log(json.appointment.length, ' is equal or less than 1');
      }
      console.log(json);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // console.log('DoctorHomepage = ',userData)
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  const backgroundStyle = 'bg-neutral-300 dark:bg-slate-900';
  const style = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'Inter-Regular',
      color: 'black',
    },
    toMngm: {
      alignItems: 'center',
      backgroundColor: '#82E7C9',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 8,
      borderRadius: 8,
      alignSelf: 'center',
      width: '70%',
      borderWidth: 0,
      
    },
    toContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 4,
    },
    toText: {
      fontFamily: 'Kanit-Regular',
      // borderWidth: 3,
      marginRight: 10,
      color: 'black',
    },
    calendar: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
  });

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 20,
          borderWidth: 0,
          height: 0,
        }}>
        <View>
          {!appointData ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'red',
                borderWidth: 0,
                height:450
              }}>
              <Text style={{color: 'black', fontFamily: 'Kanit-Regular'}}>
                ไม่พบการนัดหมาย {appointData}
              </Text>
            </View>
          ) : (
            <FlatList
              data={currData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity style={{maxHeight:450,height:450}}>
                  <CardHome>
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          fontFamily: 'Kanit-Bold',
                          alignSelf: 'flex-start',
                          color: 'black',
                        }}>
                        {item.email.length > 15
                          ? item.email.substr(0, 15) + '...'
                          : item.email}
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
        <TouchableOpacity
          style={style.toMngm}
          onPress={() => navigation.navigate('SetTimeScreen')}>
          <Image
            style={style.calendar}
            source={require('../asset/Calendar.png')}
          />
          <View style={style.toContent}>
            <Text style={style.toText}>ตั้งค่าเวลา</Text>
          </View>
        </TouchableOpacity></View>
    </>
  );
}

export default DoctorHomepage;
