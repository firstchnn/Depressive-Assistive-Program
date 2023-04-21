import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function CardHome(props) {
  const nav = useNavigation();

  return (
    <View style={styles.CardHome}>
      <View style={styles.cardContent}>
        {props.children}
        {/* <TouchableOpacity */}
          {/* // style={styles.Button_to_Doc_Detail} */}
          {/* onPress={() => nav.navigate('DoctorDetail')}> */}
          {/* <Text>Button</Text> */}
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CardHome: {
    borderRadius: 4,
    elevation: 4,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    // borderColor: 'green',
    // borderWidth: 3,
    width:300,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
    flexDirection: 'column',
    padding: 0,
    alignItems: 'flex-start',
  },
  Button_to_Doc_Detail: {
    backgroundColor: 'gray',
    width: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
