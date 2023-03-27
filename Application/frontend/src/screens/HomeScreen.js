import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  // Icon,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
// import GlobalStyle from '../utils/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import CardHome from '../components/CardHome';
// import {useColorScheme} from 'nativewind';
import {Icon} from 'react-native-elements';
import {MaterialIcons} from '@expo/vector-icons';

// import arrow_right from '../../asset/'
// import ArrowButton  from '../components/TouchableOpacity';
// import { Button,Icon } from 'semantic-ui-react'
// import BottomTabNav from '../components/BottomTabNav';
function HomeScreen({navigation, route}) {
  const {width: viewportWidth} = Dimensions.get('window');
  const {height: viewportHeight} = Dimensions.get('window');
  const vw = viewportWidth / 100;
  const vh = viewportHeight / 100;

  const [searchText, setSearchText] = useState('');
  // const filteredData = data.filtered((item) =>
  //   item.name.toLowerCase().includes(searchText.toLowerCase())
  // );
  const handleTextChange = (text) => {
    setSearchText(text);
    let temp = [];
    for(let i = 0; i < data.length ; i++){
      if (data[i].name.includes(text)){
        temp.push(data[i]);
      }
    }
    setCurrData(temp);
  }
  const filteredData = data && data.filter((item) =>
  item.name.toLowerCase().includes(searchText.toLowerCase())
);
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
  const [search, setSearch] = useState('');
  
  const [userData, setUserData] = useState({});
  const updateSearch = () => {
    setSearch(search);
  };
  const [data, setData] = useState(null);
  const [currData, setCurrData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const styles = StyleSheet.create({
    Search_Bar: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2 * vh,
      height: 6 * vh,
    },
    Text_Input: {
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 32,
      width: 85 * vw,
      paddingLeft: 4 * vw,
      paddingRight: 13 * vw,
      marginTop: 1 * vh,
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
    setIsLoading(true);
    try {
      const response = await fetch('https://ce22.onrender.com/all-doctor');
      const json = await response.json();
      setData(json);
      setCurrData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    setUserData(route.params);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  const backgroundStyle = 'bg-neutral-300 dark:bg-slate-900';
  // const {colorScheme, toggleColorScheme} = useColorScheme();
  const style = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'Inter-Regular',
    },
  });

  return (
    <>
      <View style={styles.Search_Bar}>
        <TextInput
          style={styles.Text_Input}
          placeholder="ค้นหา"
          onChangeText={text => handleTextChange(text)}
          value={searchText}>
        </TextInput>
        <Image
          style={styles.search_Icon}
          source={require('../asset/Search.png')}></Image>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 20,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10,
            // borderColor: 'red',
            // borderWidth: 3,
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
                alignSelf: 'center',
                marginRight: 20,
                marginBottom: 15,
              }}>
              เริ่มต้นการสนทนา
            </Text>
            <Image
              style={{alignSelf: 'center'}}
              source={require('../asset/arrow_right.png')}></Image>
            {/* <Button
              title="Start Chatting"
              
            /> */}
          </View>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10,
            // borderColor: 'blue',
            // borderWidth: 3,
          }}>
          {/* <Text style={{marginRight: 20, fontSize: 20}}>ปรึกษาแพทย์</Text> */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Sarabun, sans-serif',
            }}>
            ปรึกษาแพทย์
          </Text>
          <View style={{width: '30%'}}></View>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorList')}>
            <Text
              style={{
                color: 'black',
                textDecorationLine: 'underline',
                fontSize: 14,
              }}

              // onPress={() => navigation.navigate('TestPage')}
            >
              ดูเพิ่มเติม+
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Switch value={colorScheme==="dark"} onChange={toggleColorScheme}></Switch> */}
        {/* <Text>Welcome {userData.displayName}</Text>
        <Text>Email : {userData.email}</Text> */}

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
          }}>
          {/* <View style={{flexDirection: 'row'}}> */}
          {/* <TouchableOpacity
              style={{borderRadius: 5, backgroundColor: '#A3E4D7', padding: 10}}
              onPress={fetchData}>
              <Text style={{fontWeight: 'bold', fontFamily: 'sans-serif'}}>
                Fetch Data
              </Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity
              style={{borderRadius: 5, backgroundColor: '#A3E4D7', padding: 10}}
              onPress={fetchData}> */}
          {/* <Text style={{fontWeight: 'bold', fontFamily: 'Gloock-serif'}}> */}
          {/* <Text style={[GlobalStyle.CustomFont]}> */}
          {/* Fetch Data */}
          {/* </Text> */}
          {/* </TouchableOpacity> */}
          {/* </View> */}
          {isLoading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              data={currData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DoctorDetail', {id: item._id})
                  }>
                  <CardHome>
                    <View style={{flexDirection: 'column'}}>
                      {/* <Text>{item._id}</Text> */}
                      <Text>{item.name}</Text>
                      <Text>{item.tel}</Text>
                      <Text>{item.workplace}</Text>
                      <Text>{item.expertise}</Text>
                      <Text>{item.ovr_rating}</Text>
                      <Text>{item.consultantNumber}</Text>
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
