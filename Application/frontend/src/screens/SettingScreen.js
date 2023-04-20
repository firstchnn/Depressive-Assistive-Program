import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import {UserContext} from '../components/UserContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

function SettingScreen({navigation}) {
  const nav = useNavigation();
  const {userData, setUserData} = React.useContext(UserContext);
  const [singleUser, setSingleUser] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const handleClose = async () => {
    await togglePopup();
  };

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
  const fetchData = async () => {
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

  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [expertise, setExpertise] = useState('');
  const [license, setLicense] = useState('');
  const [error, setError] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const postRequest = async () => {
    if (!name || !tel || !workplace || !expertise || !license) {
      setError('Please fill out all fields');
      console.log('ERROR');
    } else {
      setError('');
      await fetch('https://ce22.onrender.com/requests', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name,
          email: userData.email,
          tel: tel,
          workplace: workplace,
          expertise: expertise,
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
      await handleClose();
    }
  };

  const openGallery = () => {
    const options = {
      storageOptions : {
        path : 'images',
        mediaType : 'photo',
      },
      includeBase64 : true,
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if(response.didCancel) {
        console.log('User cancelled')
      } else if(response.error){
        console.log('IMGpicker Error : ',response.error);
      } else if(response.customButton){
        console.log('User tapped custom button : ',response.customButton);
      } else {
        const source = {usi: 'data:image/jpeg;base64' + response.base64};
        setImageUri(source)
      }
    })
  };

  useEffect(() => {
    fetchData();
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
        <TouchableOpacity style={styles.option} onPress={fetchData}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        {singleUser == null && (
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Loading...</Text>
          </TouchableOpacity>
        )}
        {singleUser != null && singleUser.role !== 'doctor' && (
          <TouchableOpacity style={styles.option} onPress={togglePopup}>
            <Text style={styles.optionText}>Request Professional Account</Text>
          </TouchableOpacity>
        )}
        {singleUser != null && singleUser.role === 'doctor' && (
          <TouchableOpacity
            style={styles.option}
            onPress={() => nav.navigate('DocNav')}>
            <Text style={styles.optionText}>
              Switch to Professional Account
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
        <TouchableOpacity
          style={styles.option}
          onPress={() => nav.navigate('VideoCall')}>
          <Text style={styles.optionText}>VideoCall</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={popupVisible} animationType="slide">
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.IndexNumber}>Request</Text>
            <TouchableOpacity onPress={() => handleClose()}>
              <Image
                style={styles.ExitButton}
                source={require('../asset/Close.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={{padding: '5%'}}>
            <Text style={styles.labelHead}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              // onBlur={() => validateForm()}
            />

            <Text style={styles.labelHead}>Telephone</Text>
            <TextInput
              style={styles.input}
              value={tel}
              onChangeText={setTel}
              // onBlur={() => validateForm()}
            />

            <Text style={styles.labelHead}>Workplace</Text>
            <TextInput
              style={styles.input}
              value={workplace}
              onChangeText={setWorkplace}
              // onBlur={() => validateForm()}
            />

            <Text style={styles.labelHead}>Expertise</Text>
            <TextInput
              style={styles.input}
              value={expertise}
              onChangeText={setExpertise}
              // onBlur={() => validateForm()}
            />

            <Text style={styles.labelHead}>Medical license number</Text>
            <TextInput
              style={styles.input}
              value={license}
              onChangeText={setLicense}
              // onBlur={() => validateForm()}
            />

            <TouchableOpacity style={styles.button} onPress={() => openGallery}>
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            <Image
            source={imageUri}
            style={{height : 50,width:50,}}
            />

            {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
            <TouchableOpacity
              style={styles.button}
              onPress={() => postRequest()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    // backgroundColor:'#6983CE',
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
    fontFamily: 'Kanit-Regular',
  },
  ExitButton: {
    alignSelf: 'center',
    width: 25,
    height: 25,
    marginRight: 20,
    resizeMode: 'contain',
    marginTop: 20,
  },
  IndexNumber: {
    marginLeft: 15,
    paddingBottom: 0,
    paddingTop: 20,
    textAlign: 'left',
  },
  labelHead: {
    fontSize: 16,
    fontFamily:'Kanit-Bold',
    marginTop: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    fontFamily:'Kanit-Regular',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    marginBottom: 6,
    // paddingBottom:10,
    marginHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingScreen;
