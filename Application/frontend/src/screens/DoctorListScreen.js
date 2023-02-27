// import * as React from 'react';
import {  Button,
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
  StyleSheet, } from 'react-native';
import React, {useEffect, useState} from 'react';
import CardHome from '../components/CardHome';

function DoctorListScreen({navigation, route}) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({});
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
    fetchData();
  }, []);



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Doctor List Screen</Text>
      {/* <TouchableOpacity
              style={{borderRadius: 5, backgroundColor: '#A3E4D7', padding: 10}}
              onPress={fetchData}>
              <Text style={{fontWeight: 'bold', fontFamily: 'sans-serif'}}>
                Fetch Data
              </Text>
            </TouchableOpacity> */}
    
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
    
  );
}

export default DoctorListScreen;