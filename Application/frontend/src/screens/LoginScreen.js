import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { UserContext } from '../components/UserContext';

const LoginScreen = ({navigation}) => {
  const { userData, setUserData } = React.useContext(UserContext);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '243886581222-u51vuh9dkq8c39hru7qh4v12detq1q29.apps.googleusercontent.com',
    });
  }, []);
  // useEffect(() => {
  //   if(userData !== null){
  //     nav.navigate('BottomNav');
  //   }
  // }, []);

  const googleSignIn = async () => {
    try {
      // Check if your device supports Google Play
      await console.log('Google Signin is available')
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error; // re-throw the error to be caught by the outer catch statement
    }
  };

  const postUser = async userData => {
    await console.log('Posting user');
    await console.log('displayName:', userData.displayName);
    await console.log('email: ', userData.email);
    await console.log('emailVerified:', userData.emailVerified);
    await console.log('metadata:', userData.metadata);
    await console.log('phoneNumber:', userData.phoneNumber);
    await console.log('photoURL:', userData.photoURL);
    await console.log('uid:', userData.uid);
    await fetch('https://ce22.onrender.com/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        displayName: userData.displayName,
        email: userData.email,
        emailVerified: userData.emailVerified,
        // metadata: userData.metadata,
        phoneNumber: userData.phoneNumber,
        photoURL: userData.photoURL,
        uid: userData.uid,
        role: 'user',
        appointment : {},
      }),
    })
      .then(res => {
        console.log(res.status);
        console.log(res.headers);
        console.log('response = ',res);
        console.log('response body:',res.text());
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
    await successLogin(userData.email);
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
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
    },
  });

  const successLogin = async userData => {
    // console.log(userData)
    // await console.log(data)
    await console.log('Navigating')
    await navigation.navigate('BottomNav', {
      displayName: userData.displayName,
      email: userData.email,
      emailVerified: userData.emailVerified,
      metadata: userData.metadata,
      phoneNumber: userData.phoneNumber,
      photoURL: userData.photoURL,
      uid: userData.uid,
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
        <Image
        style={{marginBottom:30}}
          source={require('../asset/Big-logo.png')}></Image>
      {/* <Text style={{paddingBottom: 20}}>Login Screen</Text> */}
      <View style={{paddingBottom: 20}}></View>
      <TouchableOpacity
        style={styles.buttonGoogle}
        onPress={() =>
          googleSignIn()
            .then(async res => {
              const userData = res.user;
              setUserData(userData);
              postUser(userData);
            })
            .catch(error => {
              console.log(error);
            })
        }>
        <View style={{flex: 1}}>
          <Image
            style={{width: 20, height: 20, marginRight: 10}}
            resizeMode="contain"
            source={require('../asset/Google_Login.png')}></Image>
        </View>
        <View style={{flex: 4}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
