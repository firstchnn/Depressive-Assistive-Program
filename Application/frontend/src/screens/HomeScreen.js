import React, {useEffect, useState}from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import { Card, SearchBar } from '@rneui/base';
import { useNavigation } from "@react-navigation/native"
import CardHome from '../components/CardHome';
// import BottomTabNav from '../components/BottomTabNav';

function HomeScreen({navigation,route}) {
  const [search,setSearch] = useState('');
  const [userData, setUserData] = useState({});
  const updateSearch = () => {
    setSearch(search)
  }
  useEffect(() => {
    setUserData(route.params)
  },[])
  return (
    <><View>
      <SearchBar placeholder='Type Here...' 
      onChangeText={updateSearch}
      value = {search}/>
    </View>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin:20}}>
      <View style={{alignItems: 'center', flexDirection:'row',margin:10,borderColor:'red',borderWidth:3}}>
      <Text style={{margin:4}}>Picture here</Text>
        <Button
        title='Start Chatting'
        onPress={() => navigation.navigate('UserChat')} />
        </View>
        <View style={{alignItems: 'center', flexDirection:'row',margin:10,borderColor:'blue',borderWidth:3}}>
          <Text style={{marginRight:20,fontSize:20}}>ปรึกษาแพทย์</Text>
      <Text 
        style={{color:'blue',textDecorationLine:'underline',fontSize:16}} 
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
        
       */}
      </ScrollView>
      
    </View></>
  );
}

export default HomeScreen;