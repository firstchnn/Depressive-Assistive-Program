import React, {useEffect, useState}from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import { SearchBar } from '@rneui/base';
import { useNavigation } from "@react-navigation/native"
// import BottomTabNav from '../components/BottomTabNav';

function HomeScreen({navigation}) {
  const [search,setSearch] = useState('');
  const updateSearch = () => {
    setSearch(search)
  }
  return (
    <><View>
      <SearchBar placeholder='Type Here...' 
      onChangeText={updateSearch}
      value = {search}/>
    </View>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin:20}}>
      <Text>Home Screen</Text>
      <Button
        title='Start Chatting'
        onPress={() => navigation.navigate('UserChat')} />
      <Text>Doctor List</Text>
      <Button
        title='More+'
        onPress={() => navigation.navigate('DoctorList')} />

      {/* <BottomTabNav/> */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{marginTop:50}}>
      <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
        <Button
        title='Doctor Doctor'
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}/>
      </ScrollView>
    </View></>
  );
}

export default HomeScreen;