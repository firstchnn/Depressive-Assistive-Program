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
  const [workFrom, setWorkFrom] = useState('');
  const [workTo, setWorkTo] = useState('');
  const currentDate = new Date();

  const handleTime = (currentDateTime, appointmentTime, appointmentDate) => {
    console.log(`currentDateTime : ${currentDateTime}`);
    console.log(`appointmentTime : ${appointmentTime}`);
    console.log(`appointmentDate : ${appointmentDate}`);

    const [currentHours, currentMinutes] = currentDateTime
      .split(' ')[1]
      .split(':');
    const [appointmentHours, appointmentMinutes] = appointmentTime.split(':');

    const currentDate = currentDateTime.split(',')[0];
    const appointmentDateObj = new Date(appointmentDate);
    const isSameDate = currentDate === appointmentDate;

    // Convert hours and minutes to numbers
    const currentHoursNum = parseInt(currentHours, 10);
    const currentMinutesNum = parseInt(currentMinutes, 10);
    const appointmentHoursNum = parseInt(appointmentHours, 10);
    const appointmentMinutesNum = parseInt(appointmentMinutes, 10);

    console.log(`currentHoursNum : ${currentHoursNum}`);
    console.log(`currentMinutesNum : ${currentMinutesNum}`);

    const timeDifference =
      appointmentHoursNum * 60 +
      appointmentMinutesNum -
      (currentHoursNum * 60 + currentMinutesNum);

    //  if it 0 it mean that the time have arrive
    console.log(`Time difference in minutes: ${timeDifference}`);

    if (currentDate === appointmentDate) {
      console.log(`The date is the same: ${currentDate}`);
    } else {
      console.log(
        `The date is not the same. Current date: ${currentDate}, Appointment date: ${appointmentDate}`,
      );
    }
    return !isSameDate || timeDifference > 10;
  };

  const dateTimeOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
  };
  // const currentDateTimeString = currentDate.toLocaleString(); // Convert to string
  const currentDateTime = currentDate.toLocaleString(
    undefined,
    dateTimeOptions,
  );
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
      {/* <Text>Current Date and Time: {currentDateTime}</Text> */}
      {/* <Text>
        Work Time: {workFrom} - {workTo}
      </Text> */}
      <View style={styles.countContainer_out}>
      <Image
              // source={{uri: data.imageURL}}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                resizeMode: 'contain',
                marginBottom: 16,
              }} // You can adjust the width and height as needed
            ></Image>
            <Text style={{color: 'black', fontFamily: 'Kanit-Bold'}}>
          {route.params.name}
        </Text>
            <View style={{alignItems:'flex-start'}}>
        
        <Text style={{color: 'black', fontFamily: 'Kanit-Regular'}}>วันนัดหมาย : {route.params.day}</Text>
        <Text style={{color: 'black', fontFamily: 'Kanit-Regular'}}>เวลานัดหมาย : {route.params.time}</Text>
        </View>
      </View>

      {handleTime?
        (<TouchableOpacity
          style={styles.button_Appointment_Disable}
          disabled={handleTime(
            currentDateTime,
            route.params.time,
            route.params.day,
          )}
        >
          <Text
            style={{color: 'black', fontFamily: 'Kanit-Bold', color: 'white'}}>
            นัดหมาย
          </Text>
        </TouchableOpacity>):(
          <TouchableOpacity
          style={styles.button_Appointment}
          onPress={() => navigation.navigate('VideoCallScreen')}
        >
          <Text
            style={{color: 'black', fontFamily: 'Kanit-Bold', color: 'white'}}>
            นัดหมาย
          </Text>
        </TouchableOpacity>
        )}

      
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
    textDecorationColor: 'red',
    color: 'black',
  },
  closeText: {
    color: 'red',
    fontFamily: 'Kanit-Regular',
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    color: 'black',
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
  button_Appointment_Disable: {
    alignItems: 'center',
    backgroundColor: 'gray',
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
    fontFamily: 'Kanit-Bold',
    color: 'black',
  },
});

export default AppointmentDetail;
