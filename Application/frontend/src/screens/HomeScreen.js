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
  AppState,
  // Pressable,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import CardHome from '../components/CardHome';
import {MaterialIcons} from '@expo/vector-icons';
import { UserContext } from '../components/UserContext';
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

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://ce22.onrender.com/singleUser/${userData.email}`);
      const json = await response.json();
      setData(json);
      // setCurrData(json.appointment);
      // console.log(json.appointment.length);
      if(json.appointment.length >= 2){
        setAppointmentData(true);
        console.log('there is not appointment data available');
        json.appointment.shift()
        setCurrData(json.appointment);
      }else{
        console.log(json.appointment.length,' is equal or less than 1')
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

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
          borderWidth:0,
          borderColor:'red',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10,
            marginTop:20,
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
              style={{color:'black',
                alignSelf: 'center',
                marginRight: 20,
                marginBottom: 15,
                fontFamily:'Kanit-Regular',
                
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
            // alignSelf:'auto',
            // flexDirection: 'row',
            margin: 1,
            
            borderColor: 'blue',
            borderWidth: 0,
          }}>
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
              fontFamily:'Kanit-Regular',
              color:'black'
            }}>
            นัดหมายของฉัน
          </Text>
          
          <View style={{width: '30%'}}></View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 12,
            maxHeight:400
          }}>
          {!appointData? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color:'black' ,fontFamily:'Kanit-Regular'}}>ไม่พบการนัดหมาย {appointData}</Text>
            </View>
          ) : (
            <FlatList
              data={currData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>      
                    navigation.navigate('AppointmentDetail', {name : item.doctorName, day: item.day, time : item.time})
                  }
                  >
                  <CardHome>
                    <View style={{flexDirection: 'column'}}>
                    {/* <Text>have data {appointData}</Text> */}
                      {/* <Text>{item._id}</Text> */}
                      <Text style={{fontFamily:'Kanit-Bold',alignSelf:'flex-start',color:'black'}}>{item.doctorName.length > 15
                      ? item.doctorName.substr(0, 15) + '...'
                      : item.doctorName}</Text>
                      {/* <Text style={{fontFamily:'Kanit-Regular'}}>{item.tel}</Text> */}
                      <Text style={{fontFamily:'Kanit-Regular',color:'black'}}>{item.day}</Text>
                      <Text style={{fontFamily:'Kanit-Regular',color:'black'}}>{item.time}</Text>
                      {/* <Text style={{fontFamily:'Kanit-Regular'}}>{item.doctorName}</Text> */}
                      {/* <Text style={{fontFamily:'Kanit-Regular'}}>{item.ovr_rating}</Text> */}
                      {/* <Text style={{fontFamily:'Kanit-Regular'}}>{item.consultantNumber}</Text> */}
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
