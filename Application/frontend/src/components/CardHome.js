import React from "react";
import {StyleSheet, View} from 'react-native';

export default function CardHome(props){
  return(
    <View style={style.CardHome}>
      <View style={style.cardContent}>
        {props.children}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  CardHome: {
    borderRadius: 8,
    elevation:3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    borderColor:'green',
    borderWidth:3,
    
  },
  cardContent:{
    marginHorizontal: 18,
    marginVertical: 10,
    flexDirection:'row',
    padding:0,
    alignItems:'center',
    
  }
});