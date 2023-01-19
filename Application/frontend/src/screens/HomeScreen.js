import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Card, SearchBar} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import CardHome from '../components/CardHome';
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
      const response = await fetch('http://192.168.1.5:3000/all-doctor');
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
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10,
            borderColor: 'red',
            borderWidth: 3,
          }}>
          <Text style={{margin: 4}}>Picture here</Text>
          <Button
            title="Start Chatting"
            onPress={() => navigation.navigate('UserChat')}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10,
            borderColor: 'blue',
            borderWidth: 3,
          }}>
          <Text style={{marginRight: 20, fontSize: 20}}>ปรึกษาแพทย์</Text>
          <Text
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
              fontSize: 16,
            }}
            onPress={() => navigation.navigate('DoctorList')}
            // onPress={() => navigation.navigate('TestPage')}
          >
            เพิ่มเติม+
          </Text>
        </View>
        {/* <Button 
        Text style={{color:'black'}}
        title='More+' 
        color="#ffffff"
        // onPress={() => navigation.navigate('DoctorList')} 
        /> */}

        <Text>Welcome {userData.displayName}</Text>
        <Text>Email : {userData.email}</Text>
        {/* <BottomTabNav/> */}

        {/* <CardHome></CardHome> */}
        {/* <Button title="Fetch Data" onPress={fetchData} />
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          {data ? (
            <Text>{JSON.stringify(data)}</Text>
          ) : (
            <Text>No Data</Text>
          )}
        </View>
      )}

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{marginTop:0}}>
        
      <CardHome>
        <Text style={{marginRight:8}}>Doc Picture</Text>
        <Button
        title='Doctor Detail'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}
        onPress={() => navigation.navigate('DoctorDetail')}
        />
        </CardHome>
        <CardHome>
        <Button
        title='Doctor Detail'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        </CardHome>
        <CardHome>
        <Button
        title='Doctor Detail'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        </CardHome>
        <CardHome>
        <Button
        title='Doctor Detail'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        </CardHome>
        <CardHome>
        <Button
        title='Doctor Detail'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        </CardHome>
        <CardHome>
        <Button
        title='Doctor Detail'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        </CardHome>
        <CardHome>
        <Button
        title='Doctor Detail'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        </CardHome>
        <CardHome>
        <Button
        title='Doctor Detail'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        </CardHome>
        <CardHome>
        <Button
        title='Doctor Detail'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        </CardHome>
        {/* <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        
       
      </ScrollView>
       */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
          }}>
          <Button title="Fetch Data" onPress={fetchData} />
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
