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
  // Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
  // const filteredData = data.filtered((item) =>
  //   item.name.toLowerCase().includes(searchText.toLowerCase())
  // );
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
      <Text>{item.name}</Text>
    </View>
  );
  const [search, setSearch] = useState('');
  // const updateSearch = () => {
  //   setSearch(search);
  // };
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
      borderWidth: 0,
      borderRadius: 32,
      width: 85 * vw,
      paddingLeft: 4 * vw,
      paddingRight: 13 * vw,
      marginTop: 1 * vh,
      fontFamily:'Kanit-Regular',
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
      const response = await fetch(`https://ce22.onrender.com/singleUser/${userData.email}`);
      const json = await response.json();
      setData(json);
      setCurrData(json.appointment);
      console.log(json);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
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
    {/* -------------------------------------------------------------------------------------------- */}
      {/* <View style={styles.Search_Bar}>
        <TextInput
          style={styles.Text_Input}
          placeholder="ค้นหา"
          onChangeText={text => handleTextChange(text)}
          value={searchText}></TextInput>
        <Image
          style={styles.search_Icon}
          source={require('../asset/Search.png')}></Image>
      </View> */}
      {/* -------------------------------------------------------------------------------------------- */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: 0,
          borderWidth:0,
          borderColor:'red',
          
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10,
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
            {/* <Button
              title="Start Chatting"
              
            /> */}
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
          {/* <Text style={{marginRight: 20, fontSize: 20}}>ปรึกษาแพทย์</Text> */}
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
              fontFamily:'Kanit-Regular'
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
          {(isLoading && currData.length > 1) ? (
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
                  // onPress={() =>
                  //   navigation.navigate('DoctorDetail', {id: item.name})
                  // }
                  >
                  <CardHome>
                    <View style={{flexDirection: 'column'}}>
                      {/* <Text>{item._id}</Text> */}
                      <Text style={{fontFamily:'Kanit-Bold',alignSelf:'flex-start'}}>{item.doctorName.length > 15
                      ? item.doctorName.substr(0, 15) + '...'
                      : item.doctorName}</Text>
                      {/* <Text style={{fontFamily:'Kanit-Regular'}}>{item.tel}</Text> */}
                      <Text style={{fontFamily:'Kanit-Regular'}}>{item.day}</Text>
                      <Text style={{fontFamily:'Kanit-Regular'}}>{item.time}</Text>
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
