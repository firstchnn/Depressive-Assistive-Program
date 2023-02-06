import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Icon,
  TouchableOpacity,
  Image
} from 'react-native';
import {Card, SearchBar} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import CardHome from '../components/CardHome';
// import arrow_right from '../../asset/'
// import ArrowButton  from '../components/TouchableOpacity';
// import { Button,Icon } from 'semantic-ui-react'
// import BottomTabNav from '../components/BottomTabNav';

function HomeScreen({navigation, route}) {
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState({});
  const updateSearch = () => {
    setSearch(search);
  };
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://ce22.onrender.com/all-doctor');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setUserData(route.params);
  }, []);
  return (
    <>
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
        />
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
            borderColor: 'red',
            borderWidth: 3,
          }}
          onPress={() => navigation.navigate('MainChat')}
          >
          <Text style={{margin: 4}}>Picture here</Text>

          <View style={{flexDirection: 'column'}}>
            <Text style={{alignSelf: 'center'}}>เริ่มต้นการสนทนา</Text>
            <Image style={{alignSelf: 'center'}} source={require('../../asset/arrow_right.png')}></Image>
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
            borderColor: 'blue',
            borderWidth: 3,
          }}>
          <Text style={{marginRight: 20, fontSize: 20}}>ปรึกษาแพทย์</Text>
          <View style={{width: '30%'}}></View>
          <Text
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
              fontSize: 16,
            }}
            onPress={() => navigation.navigate('DoctorList')}
            // onPress={() => navigation.navigate('TestPage')}
          >
            ดูเพิ่มเติม+
          </Text>
        </View>

        {/* <Text>Welcome {userData.displayName}</Text>
        <Text>Email : {userData.email}</Text> */}

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Button title="Fetch Data" onPress={fetchData} />

            <Text style={{alignSelf: 'center'}}>Test</Text>
          </View>
          {isLoading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <CardHome>
                  <View style={{flexDirection: 'column'}}>
                    <Text>{item.name}</Text>
                    <Text>{item.tel}</Text>
                    <Text>{item.workplace}</Text>
                    <Text>{item.expertise}</Text>
                    <Text>{item.ovr_rating}</Text>
                    <Text>{item.consultantNumber}</Text>
                  </View>
                </CardHome>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
}

export default HomeScreen;
