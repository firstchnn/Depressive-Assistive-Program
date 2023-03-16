import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function DoctorDetail({navigation, route}) {
  // const DoctorDetail1 = () => {
  const [count, setCount] = useState(0);
  const [doctorID, setDoctorID] = useState({});
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const paymentContinue = () => {
    setPopupVisible(!popupVisible);
    navigation.navigate('PaymentScreen');
  }
  // const onPress = () => setCount(prevCount => prevCount + 1);
  const showData = () => {
    console.log(data._id);
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      setDoctorID(route.params);
      const response = await fetch(
        `https://ce22.onrender.com/singleDoc/${route.params.id}`,
      );
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    // setDoctorID(route.params);
    // console.log(route.params);
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.container}>
        <Text>{doctorID.id}</Text>
      </View> */}
      <View style={styles.countContainer}>
        {/* <Text>This is doctor detail pages</Text> */}
        {/* <Text>Count: {count}</Text> */}
        {data !== null ? (
          <View style={styles.countContainer}>
            <Text>{data.name}</Text>
            <Text>{data.tel}</Text>
            <Text>{data.workplace}</Text>
            <Text>{data.expertise}</Text>
            <Text>{data.ovr_rating}</Text>
            <Text>{data.consultantNumber}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} 
      onPress={togglePopup}>
        <Text>Make Apppoinment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <Modal visible={popupVisible} animationType="slide">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding:10}}>
          <Text style={{marginBottom:'6%'}}>Choose appointment time</Text>
          <TouchableOpacity style={styles.button} onPress={paymentContinue}>
            <Text>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={togglePopup}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Doctor List Screen</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: '6%',
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default DoctorDetail;
