import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
// import MySvgIcon from '../components/SVGIcon';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {Icon} from 'react-native-vector-icons/FontAwesome';
// import { MdGoogle } from "react-icons/md";
// import { FaFacebook } from 'react-icons/fa';

const LoginScreen = ({navigation}) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '243886581222-u51vuh9dkq8c39hru7qh4v12detq1q29.apps.googleusercontent.com',
    });
  }, []);

  const googleSignIn = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const styles = StyleSheet.create({
    buttonGoogle: {
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 5,
      borderColor: 'red',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      width: '50%',
      height: '5.5%',
      marginBottom: 20,
      flexDirection: 'row',
      // flex: 1,
    },
    buttonGuest: {
      backgroundColor: '#353535',
      padding: 10,
      borderRadius: 5,
      borderColor: 'red',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      width: '50%',
      height: '5.5%',
      marginBottom: 20,
      // flexDirection: 'row',
      // alignItems:'center'
      // flex: 1,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
    },
  });

  const successLogin = async data => {
    // console.log(userData)
    // await console.log(data)
    await navigation.navigate('BottomNav', {
      displayName: data.displayName,
      email: data.email,
      photo: data.photoURL,
      uid: data.uid,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5EFE9',
      }}>
      {/* ----------------------------Icon SVG------------------- */}
      {/* <View>
        <MySvgIcon width={50} height={50} color="fill" />
      </View> */}
      {/* ----------------------------Icon SVG------------------- */}
      <Text style={{paddingBottom: 20}}>Login Screen</Text>
      {/* <TouchableOpacity/> */}
      <View style={{paddingBottom: 20}}></View>

      {/* <TouchableOpacity
        style={{borderRadius: 5, backgroundColor: '#A3E4D7', padding: 10}}
        onPress={() => navigation.navigate('Home')}>
          
        <Text style={{fontWeight: 'bold', fontFamily: 'sans-serif'}}>
          Fetch Data
        </Text>
      </TouchableOpacity> */}
      {/* <Button
      style={{paddingBottom: 20}}
        title="Continue as guest"
        onPress={() => navigation.navigate('Home')}
      /> */}

      <TouchableOpacity
        // style={{
        //   borderRadius: 10,
        //   backgroundColor: '#FFFFFF',
        //   padding: 10,
        //   width:'auto',
        // }}
        style={styles.buttonGoogle}
        onPress={() =>
          googleSignIn()
            .then(res => {
              data = res;
              console.log(data.user);
              console.log(data.user.displayName);
              setUserData(data.user);
              successLogin(data.user);
            })
            .catch(error => console.log(error))
        }>
        <View style={{flex:1}}>
          <Image
            style={{width: 20, height: 20,marginRight:10}}
            resizeMode="contain"
            source={require('../asset/Google_Login.png')}></Image>
        </View>
        <View style={{flex:4}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonGuest}>
        <Text style={styles.buttonText}>Continue as guest</Text>
      </TouchableOpacity>

      {/* <Button
        style={{paddingTop: 20}}
        title="Continue with gmail"
        onPress={() =>
          googleSignIn()
            .then(res => {
              data = res;
              console.log(data.user);
              console.log(data.user.displayName);
              setUserData(data.user);
              successLogin(data.user);
            })
            .catch(error => console.log(error))
        }
      /> */}
    </View>
  );
};

export default LoginScreen;
