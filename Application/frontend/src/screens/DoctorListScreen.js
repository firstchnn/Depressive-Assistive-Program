// import * as React from 'react';
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
import React, {useEffect, useState} from 'react';
import CardHome from '../components/CardHome';

function DoctorListScreen({navigation, route}) {

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
        <Text>{item.name}</Text>
      </View>
    );

  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {width: viewportWidth} = Dimensions.get('window');
  const {height: viewportHeight} = Dimensions.get('window');
  const vw = viewportWidth / 100;
  const vh = viewportHeight / 100;
  const [userData, setUserData] = useState({});
  const [currData, setCurrData] = useState([]);
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
  const styles = StyleSheet.create({
    Search_Bar: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2 * vh,
      height: 6 * vh,
      marginBottom: 2*vh,
    },
    search_Icon: {
      position: 'absolute',
      right: 15,
      top: 15,
      height: 20,
      width: 20,
    },
    Text_Input: {
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 8,
      width: 85 * vw,
      paddingLeft: 4 * vw,
      paddingRight: 13 * vw,
      marginTop: 1 * vh,
    },
  });


  // const filteredData = data.filtered((item) =>
  //   item.name.toLowerCase().includes(searchText.toLowerCase())
  // );

 

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontFamily:'Kanit-Bold',fontSize:32,marginTop:24,}}>Doctor List</Text>
      <View style={styles.Search_Bar}>
        <TextInput
          style={styles.Text_Input}
          placeholder="ค้นหา"
          onChangeText={text => handleTextChange(text)}
          value={searchText}></TextInput>
        <Image
          style={styles.search_Icon}
          source={require('../asset/Search.png')}></Image>
      </View>
      
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={currData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DoctorDetail', {id: item.name})
              }>
              <CardHome>
                <View style={{}}>
                    {/* for profile image */}
                </View>
                <View style={{flexDirection: 'column'}}>
                  {/* <Text>{item._id}</Text> */}
                  <Text style={{fontFamily:'Kanit-Bold',alignSelf:'flex-start'}}>{item.name.length > 15
                  ? item.name.substr(0, 15) + '...'
                  : item.name}</Text>
                  {/* <Text style={{fontFamily:'Kanit-Regular'}}>{item.tel}</Text> */}
                  <Text style={{fontFamily:'Kanit-Regular'}}>{item.workplace}</Text>
                  <Text style={{fontFamily:'Kanit-Regular'}}>{item.expertise}</Text>
                  {/* <Text style={{fontFamily:'Kanit-Regular'}}>{item.ovr_rating}</Text> */}
                  {/* <Text style={{fontFamily:'Kanit-Regular'}}>{item.consultantNumber}</Text> */}
                </View>
              </CardHome>
            </TouchableOpacity>
          )}
        />
      )}
      {/* /> */}
      {/* )} */}
    </View>
  );
}

export default DoctorListScreen;
