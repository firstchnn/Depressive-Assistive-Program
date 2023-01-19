import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginScreen = ({navigation}) => {
  const [userData,setUserData] = useState();
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

  const successLogin = async(data) => {
    // console.log(userData)
    // await console.log(data)
    await navigation.navigate('BottomNav',{
      displayName : data.displayName,
      email : data.email,
      photo : data.photoURL,
      uid : data.uid,
    })
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
      style={{paddingBottom:20}}
      >Login Screen</Text>
      {/* <TouchableOpacity/> */}
      <View style={{paddingBottom:20}}>
      <Button
        title="Continue as guest"
        onPress={() => navigation.navigate('Home')}
      />
      </View>
      <Button
      style={{paddingTop:20}}
        title="Continue with gmail"
        onPress={() =>
          googleSignIn()
            .then(res => {
              data = res
              console.log(data.user)
              console.log(data.user.displayName);
              setUserData(data.user);
              successLogin(data.user);
            })
            .catch(error => console.log(error))
        }
      />
    </View>
  );
};

export default LoginScreen;
