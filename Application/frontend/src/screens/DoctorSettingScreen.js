import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {UserContext} from '../components/UserContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

function DoctorSettingScreen({navigation}) {
  const nav = useNavigation();
  const {userData, setUserData} = React.useContext(UserContext);
  const [singleUser, setSingleUser] = useState({});
  const [singleDoc, setSingleDoc] = useState({});

  function encodeEmail(email) {
    const encodedEmail = email.replace(/[@.]/g, match => {
      switch (match) {
        case '@':
          return '%40';
        case '.':
          return '%2E';
        default:
          return match;
      }
    });
    return encodedEmail;
  }
  const fetchUserData = async () => {
    let email = encodeEmail(userData.email);
    try {
      const response = await fetch(
        `https://ce22.onrender.com/singleUser/${email}`,
      );
      const json = await response.json();
      setSingleUser(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDoctorData = async () => {
    let email = encodeEmail(userData.email);
    try {
      const response = await fetch(
        `https://ce22.onrender.com/singleDoc/${email}`,
      );
      const json = await response.json();
      setSingleDoc(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log('DoctorSetting = ',userData)
    fetchUserData();
    // fetchDoctorData();
  }, []);

  const handleLogout = async () => {
    // Clear the userData value from the UserContext provider
    setUserData(null);
    // Sign out the user from Google
    await GoogleSignin.signOut();
    // Navigate the user back to the login screen
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.option} onPress={() => nav.navigate('SetTimeScreen')}>
          <Text style={styles.optionText}>Appointment Setting</Text>
        </TouchableOpacity>
        {singleUser == null && (
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Loading...</Text>
          </TouchableOpacity>
        )}
        {singleUser != null && singleUser.role === 'doctor' && (
          <TouchableOpacity style={styles.option} onPress={() => nav.navigate('Home')}>
            <Text style={styles.optionText}>
              Switch to Normal Account
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy and Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Accounts Center</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Report a Problem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => nav.navigate('VideoCall')}>
          <Text style={styles.optionText}>VideoCall</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 24,
  },
  section: {
    marginTop: 24,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: 'gray',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
    marginLeft: 16,
    marginBottom: 8,
  },
  option: {
    padding: 16,
  },
  optionText: {
    fontSize: 16,
    fontFamily:'Kanit-Regular',
    color:'black',
  },
});

export default DoctorSettingScreen;
