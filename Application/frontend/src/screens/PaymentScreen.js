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
import Omise from 'omise-react-native';

function PaymentScreen({navigation}) {
  const nav = useNavigation();
  const [qrCodeData, setQrCodeData] = useState('');
  const promptPayId = '1234567890123'; // PromptPay ID
  const amount = '500'; // Amount to be paid
  

  async function omiseSetup() {
    await Omise.config('pkey_test_5v7e32m5mhrxedjbtf2', '2019-05-29');
    const source = await Omise.createSource({
      type: 'promptpay',
      amount: amount,
      currency: 'thb',
    });
    console.log(source);
    const sourceId = source.id;
    console.log(sourceId)
    // console.log(amount.toFixed(2));
    const qrCodeText = `00020101021129370016A000000677010111${promptPayId}0126${amount}5802TH5303764${sourceId}304`;
    setQrCodeData(qrCodeText);
  }
  useEffect(() => {
    omiseSetup();
  }, []);
  const Spinner = () => {
    const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotationAngle(angle => angle + 10);
    }, 50);
    return () => clearInterval(intervalId);
  }, []);
  }

  return (
    <View style={styles.circle}>
      
      <View style={styles.countContainer}>
        <Text>Payment</Text>
      </View>
      <View style={styles.countContainer}>
      {qrCodeData ? (
        <QRCode value={qrCodeData} />
      ) : (
        <Text style={styles.loadingText}>Loading QR code...</Text>
      )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text>Continue</Text>
      </TouchableOpacity>
      <ActivityIndicator
        size="large"
        color="#00ff00"
        style={styles.spinner}
        animating={true}
        transform={[{ rotate: '45deg' }]}
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
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: '6%',
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    transform: [{ rotate: '45deg' }],
  },
});

export default PaymentScreen;
