import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


function DoctorDetail({navigation,route}){
// const DoctorDetail1 = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text>This is doctor detail pages</Text>
        {/* <Text>Count: {count}</Text> */}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>

    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Doctor List Screen</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});


export default DoctorDetail;