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
// import {Picker} from '@react-native-picker/picker';
import {Calendar} from 'react-native-calendars';
// import {todayString} from 'react-native-calendars/src/expandableCalendar/commons';
import TimeDropdown from '../components/TimeDropdown';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import CalendarPicker from 'react-native-calendar-picker';
import {
  WheelPicker,
  TimePicker,
  DatePicker,
} from 'react-native-wheel-picker-android';
import {UserContext} from '../components/UserContext';

function DoctorDetail({navigation, route}) {
  const [doctorID, setDoctorID] = useState({});
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [workDay, setWorkDay] = useState([]);
  const [workFrom, setWorkFrom] = useState();
  const [workTo, setWorkTo] = useState();
  const [timeArray, setTimeArray] = useState([]);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pickableDates, setPickableDates] = useState({});
  const {userData} = React.useContext(UserContext);
  const wheelPickerData = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );

  const handleSelectTime = time => {
    setSelectedTime(time);
    // console.log(timeArray[time]);
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const paymentContinue = () => {
    setPopupVisible(!popupVisible);
    navigation.navigate('PaymentScreen', {
      email: userData.email,
      day: selectedDate,
      time: timeArray[selectedTime],
      doctorName: data.name,
      amount: data.price * 100,
    });
  };

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

  function createTimeArray(startTime, endTime, appointment) {
    const result = [];
    // console.log(appointment);
    const temp1 = [];
    let current = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    while (current < end) {
      const hours = current.getHours().toString().padStart(2, '0');
      const minutes = current.getMinutes().toString().padStart(2, '0');
      result.push(`${hours}:${minutes}`);
      current.setTime(current.getTime() + 30 * 60 * 1000); // add 30 minutes
    }
    for (let i = 0; i < appointment.length - 1; i++) {
      temp1.push(appointment[i + 1].time);
    }
    const temp2 = result.filter(item => !temp1.includes(item));
    setTimeArray(temp2);
    // return result;
  }

  const fetchPickableDates = async daysArray => {
    const days = daysArray;
    // const times = timesArray;
    // await console.log();
    // ['04:00', '04:30', '05:00', '05:30'];
    const pickableDates = {};
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const day = date.toLocaleString('en-US', {weekday: 'short'});
      // console.log(day.slice(0,3)+' '+days.includes(day.slice(0,3)))
      if (days.includes(day.slice(0, 3))) {
        // console.log(day + ' in days');
        const dateString = date.toISOString().slice(0, 10);
        pickableDates[dateString] = {
          selectable: true,
          marked: true,
          // disableTouchEvent: times.every(
          //   time =>
          //     new Date(`${dateString} ${time}`).getTime() <
          //     new Date().getTime(),
          // ),
        };
      }
    }
    await setPickableDates(pickableDates);
    // await console.log(Object.keys(pickableDates)[0]);
    for (let date in pickableDates) {
      // console.log(date);
    }
  };

  const handleDayPress = day => {
    for (let date in pickableDates) {
      if (day.dateString === date) {
        // showTimePicker();
        setSelectedDate(day.dateString);
        // console.log(day);
        break;
      }
    }
  };

  const markedDates = {
    ...pickableDates,
    [selectedDate]: {selected: true, marked: true},
  };

  useEffect(() => {
    fetchData();
    // fetchPickableDates();
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
        {data !== null ? (
          <View style={styles.countContainer}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Kanit-Bold',
                fontSize: 24,color:'black',
              }}>
              {data.name.length > 20
                ? data.name.substring(0, 20) + '...'
                : data.name}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Kanit-Regular',
                fontSize: 16,color:'black',
              }}>
              {data.expertise}
            </Text>
            {/* <Text>Tel: {data.tel}</Text> */}
            <Text style={{fontFamily: 'Kanit-Regular',color:'black',}}>
              workplace: {data.workplace}
            </Text>
            {/* <Text></Text> */}
            <Text style={{fontFamily: 'Kanit-Regular',color:'black',}}>
              Price: {data.price}
            </Text>
            <Text style={{fontFamily: 'Kanit-Regular',color:'black',}}>
              Work day: {data.workday}
            </Text>
            <Text style={{fontFamily: 'Kanit-Regular',color:'black',}}>
              Work time: {data.worktime.slice(0, 5).replace(',', ':')} -{' '}
              {data.worktime.slice(5).replace(',', ':')}
            </Text>
          </View>
        ) : (
          <View>
            <ActivityIndicator
              size="large"
              color="#00ff00"
              style={styles.spinner}
              animating={true}
              transform={[{rotate: '45deg'}]}
            />
            <Text style={{alignSelf: 'center'}}>Loading...</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.button_Appointment}
        onPress={() => togglePopup()}>
        <Text style={{fontWeight: 'bold',color:'black',}}>นัดหมาย</Text>
      </TouchableOpacity>
      <Modal visible={popupVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            // alignItems: 'center',
            padding: 10,
            borderWidth: 0,
          }}>
          <Text
            style={{
              marginVertical: '6%',
              alignSelf: 'center',
              fontFamily: 'Kanit-Regular',
              fontSize: 16,
            }}>
            Choose appointment time
          </Text>
          <View style={{flex: 1, width: '100%'}}>
            <Calendar
              minDate={today.toISOString().slice(0, 10)}
              maxDate={maxDate.toISOString().slice(0, 10)}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              style={{
                // flex:1,
                // alignSelf: 'stretch',
                borderWidth: 0,
                borderColor: 'green',
                position: 'relative',
              }}
            />
          </View>
          <View
            style={{
              borderWidth: 0,
              alignItems: 'center',
              alignSelf: 'center',
              flexDirection: 'column',
              width: '80%',
              marginTop: 'auto',
            }}>
            <View style={{borderWidth: 0, borderColor: 'red'}}>
              {timeArray.length > 0 && (
                <WheelPicker
                  selectedItem={selectedTime}
                  data={timeArray}
                  onItemSelected={handleSelectTime}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.buttonCtn}
              onPress={() => paymentContinue()}>
              <Text style={styles.ContinueText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCls} onPress={togglePopup}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

export default DoctorDetail;
