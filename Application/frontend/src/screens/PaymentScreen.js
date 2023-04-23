import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
// import Omise from 'omise-react-native';

function PaymentScreen({navigation, route}) {
  const nav = useNavigation();
  const [data, setData] = useState({});
  const [qrData, setQrData] = useState('');

  const handleData = async(data) => {
    await setData(data.params)
    await createQR(data.params.amount)
  }

  const makeAppointment = async data => {
    await fetch(`https://ce22.onrender.com/appointment/${data.email}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        day: data.day,
        time: data.time,
        doctorName: data.doctorName,
      }),
    })
      .then(res => {
        console.log(res.status);
        console.log(res.headers);
        console.log('response = ', res);
        console.log('response body:', res.text());
        return res.json();
      })
      .then(
        result => {
          console.log('result = ', result);
        },
        error => {
          console.log('error = ', error);
        },
      );
    await navigation.goBack();
  };

  const createQR = async data => {
    await console.log('getting QR data...');
    // console.log(data.amount)
    await fetch('https://ce22.onrender.com/create-payment', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        amount: parseInt(data.amount),
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('complete getting QR data...');
        console.log(data.charge.source.scannable_code.image.download_uri); // replace with your desired response handling
        setQrData(data.charge.source.scannable_code.image.download_uri);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setData(route.params);
    console.log(route.params);
    createQR(route.params);
    // handleData(route.params);
  }, []);
  // const Spinner = () => {
  //   const [rotationAngle, setRotationAngle] = useState(0);

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setRotationAngle(angle => angle + 10);
  //     }, 50);
  //     return () => clearInterval(intervalId);
  //   }, []);
  // };

  return (
    <View style={styles.circle}>
      <View style={styles.countContainer}>
        <Text style={{fontFamily: 'Kanit-Regular'}}>Payment</Text>
      </View>
      {/* <View style={styles.countContainer}>
      {qrCodeData ? (
        <QRCode value={qrCodeData} />
      ) : (
        <Text style={styles.loadingText}>Loading QR code...</Text>
      )}
      </View> */}
      {qrData && (
        <View style={styles.countContainer}>
        <QRCode value={qrData} size={200} />
      </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => makeAppointment(data)}>
        <Text style={{fontFamily: 'Kanit-Regular'}}>Confirm Payment</Text>
      </TouchableOpacity>
      <ActivityIndicator
        size="large"
        color="#00ff00"
        style={styles.spinner}
        animating={true}
        transform={[{rotate: '45deg'}]}
      />
    </View>
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
    backgroundColor: '#82E7C9',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    marginBottom: '6%',
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    transform: [{rotate: '45deg'}],
  },
});

export default PaymentScreen;
