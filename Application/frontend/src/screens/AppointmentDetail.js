import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {UserContext} from '../components/UserContext';

function AppointmentDetail({navigation, route}) {
  const {userData} = React.useContext(UserContext);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      setDoctorID(route.params);
      const response = await fetch(
        `https://ce22.onrender.com/singleDoc/${route.params.id}`,
      );
      const json = await response.json();
      setData(json);
      setWorkDay(json.workday.split(','));
      setWorkFrom(json.worktime.slice(0, 5).replace(',', ':'));
      setWorkTo(json.worktime.slice(5).replace(',', ':'));
      // json.appointment.pop(0);
      // console.log(json.appointment[0])
      await createTimeArray(
        json.worktime.slice(0, 5).replace(',', ':'),
        json.worktime.slice(5).replace(',', ':'),
        json.appointment,
      );
      await fetchPickableDates(json.workday.split(','));
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // fetchData();
    // fetchPickableDates();
    // console.log(route.params.name);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image
          source={require('../asset/BackBTN.png')}
          style={styles.backIcon}
        />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.countContainer_out}>
        <Text>{route.params.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.button_Appointment}
        onPress={() => navigation.navigate('VideoCallScreen')}>
        <Text style={{fontWeight: 'bold',color:'black'}}>นัดหมาย</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
    // borderWidth:2,
    // borderColor:'red'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  ContinueText: {
    color: 'black',
    fontFamily: 'Kanit-Regular',
    // textDecorationLine:'underline',
    textDecorationColor: 'red',color:'black',
  },
  closeText: {
    color: 'red',
    fontFamily: 'Kanit-Regular',
    textDecorationLine: 'underline',
    textDecorationColor: 'red',color:'black',
  },
  button_Appointment: {
    alignItems: 'center',
    backgroundColor: '#82E7C9',
    padding: 10,
    marginBottom: '6%',
    borderRadius: 8,
    width: 180,
    alignSelf: 'center',
  },
  buttonCtn: {
    alignItems: 'center',
    backgroundColor: '#82E7C9',
    padding: 10,
    marginVertical: '2%',
    marginTop: '0%',
    borderRadius: 8,
    width: '100%',
  },
  circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    transform: [{rotate: '45deg'}],
    marginBottom: 4,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonCls: {
    alignItems: 'center',
    // borderWidth:1,
    // backgroundColor: '#82E7C9',
    padding: 10,
    marginBottom: '6%',
    borderRadius: 8,
    width: '80%',
  },
  countContainer_out: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 24,
  },
  countContainer: {
    alignItems: 'flex-start',
    padding: 10,
    borderColor: 'dimgrey',
    borderWidth: 1.5,
    borderRadius: 8,
    alignSelf: 'center',
    padding: 16,
    width: '100%',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
  },
  dayText: {
    fontSize: 18,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Kanit-Bold',color:'black',
  },
});

export default AppointmentDetail;
