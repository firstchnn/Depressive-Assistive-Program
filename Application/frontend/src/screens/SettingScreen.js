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
  ScrollView,
} from 'react-native';
import {UserContext} from '../components/UserContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary, ImagePicker} from 'react-native-image-picker';

function SettingScreen({navigation}) {
  const nav = useNavigation();
  const [uri, setUri] = useState(null);
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
  // const [imageUri, setImageUri] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedImageUri, setSelectedImageUri] = useState(null);
  // const [filePath, setFilePath]=useState({});

  const postRequest = async () => {
    // let username = userData.email.substring(0, email.indexOf('@'));
    //   console.log(username);
    if (!name || !tel || !workplace || !expertise || !license ||!uri) {
      setError('Please fill out all fields');
      console.log('ERROR');
    } else {
      setError('');
      // let username = userData.email.substring(0, email.indexOf('@'));
      // console.log(username);
      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        name: `${name}.jpg`,
        type: 'image/jpeg',
      });
      await fetch('https://ce22.onrender.com/requests', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: JSON.stringify({
          name: name,
          email: userData.email,
          tel: tel,
          workplace: workplace,
          expertise: expertise,
          medicalNumber : license,
          formData: formData,
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

  const chooseFile = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 550,
      maxHeight: 300,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri; // Get the URI from assets array
        console.log('uri -> ', uri);
        console.log(response);
        setUri(uri);
        // Do something with the uri
      }
      console.log('base64 -> ', response.base64);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);

    if (response.didCancel) {
      // alert('User cancelled camera picker');
      return;
    } else if (response.errorCode == 'camera_unavailable') {
      alert('Camera not available on device');
      return;
    } else if (response.errorCode == 'permission') {
      alert('Permission not satisfied');
      return;
    } else if (response.errorCode == 'others') {
      alert(response.errorMessage);
      return;
    }
    // const uri = response.assets[0].uri; // Added line to get the URI
    if (response.assets && response.assets.length > 0) {
      const uri = response.assets[0].uri; // Get the URI from assets array
      console.log('uri -> ', uri);
      setUri(uri);
      // Do something with the uri
    }
    console.log('base64 -> ', response.base64);
    console.log('width -> ', response.width);
    console.log('height -> ', response.height);
    console.log('fileSize -> ', response.fileSize);
    console.log('type -> ', response.type);
    console.log('fileName -> ', response.fileName);
    
    // const uri = response.uri;
    // setFilePath(response);
  });
}

  // const openGallery = () => {
  //   const options = {
  //     storageOptions: {
  //       path: 'images',
  //       mediaType: 'photo',
  //     },
  //     includeBase64: true,
  //   };
  // };

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
    <ScrollView style={styles.container}>
      <View>
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
              <Text style={styles.optionText}>
                Request Professional Account
              </Text>
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
        <ScrollView>
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
            <View style={{flexDirection:'row'}}>

            { name.length > 0 && (<View>
              <Text style={styles.labelHead}>Name</Text>
            </View>)}
            { name.length <= 0 && (<View style={styles.labelHead2}>
              <Text style={styles.labelHead}>Name</Text><Text style={styles.labelHead2}>{''} *</Text>
            </View>)}
            </View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              // onBlur={() => validateForm()}
            />
            <View style={{flexDirection:'row'}}>
            { tel.length > 0 && (<View>
              <Text style={styles.labelHead}>Telephone</Text>
            </View>)}
            { tel.length <= 0 && (<View style={styles.labelHead2}>
              <Text style={styles.labelHead}>Telephone</Text><Text style={styles.labelHead2}>{''} *</Text>
            </View>)}
            </View>
            <TextInput
              style={styles.input}
              value={tel}
              onChangeText={setTel}
              // onBlur={() => validateForm()}
            />
            <View style={{flexDirection:'row'}}>
            { workplace.length > 0 && (<View>
              <Text style={styles.labelHead}>Workplace</Text>
            </View>)}
            { workplace.length <= 0 && (<View style={styles.labelHead2}>
              <Text style={styles.labelHead}>Workplace</Text><Text style={styles.labelHead2}>{''} *</Text>
            </View>)}
            </View>
            <TextInput
              style={styles.input}
              value={workplace}
              onChangeText={setWorkplace}
              // onBlur={() => validateForm()}
            />
            <View style={{flexDirection:'row'}}>
            { expertise.length > 0 && (<View>
              <Text style={styles.labelHead}>Expertise</Text>
            </View>)}
            { expertise.length <= 0 && (<View style={styles.labelHead2}>
              <Text style={styles.labelHead}>Expertise</Text><Text style={styles.labelHead2}>{''} *</Text>
            </View>)}
            </View>
            <TextInput
              style={styles.input}
              value={expertise}
              onChangeText={setExpertise}
              // onBlur={() => validateForm()}
            />
            <View style={{flexDirection:'row'}}>
            <Text style={styles.labelHead}>Medical license number</Text>
            </View>
            <TextInput
              style={styles.input}
              value={license}
              onChangeText={setLicense}
              // onBlur={() => validateForm()}
            />
            {/* {selectedImage && ( */}
              {/* {filePath && ( */}
              {/* // <Image source={{ uri: selectedImage }} style={styles.ShownImage} /> */}
              {/* <Image */}
                {/* style={styles.image} // Update with your desired styles */}
                {/* // source={{uri: filePath.uri}} */}
                {/* Image source={{ uri }} */}
                {/* /> */}
                {/* )} */}
                {uri && <Image style={styles.ShownImage} source={{uri}} />}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => chooseFile('photo')}>
                  <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>

                {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => postRequest()}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontFamily: 'Kanit-Bold',
    marginTop: 0,
  },
  labelHead2: {
    fontSize: 16,
    fontFamily: 'Kanit-Bold',
    marginTop: 0,
    color:'#cc0000',
    flexDirection:'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Kanit-Regular',
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
  ShownImage: {
    height: 200,
    width: 200,
    alignSelf:'center',
    marginVertical:16,
    resizeMode:'contain',
    // padding:8,
    // borderWidth:0,
    // borderColor:'red'
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
