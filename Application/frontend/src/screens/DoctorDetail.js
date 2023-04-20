import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
// import CalendarPicker from 'react-native-calendar-picker';

function DoctorDetail({navigation, route}) {
  const [count, setCount] = useState(0);
  const [doctorID, setDoctorID] = useState({});
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [workDay, setWorkDay] = useState([]);
  const [workFrom, setWorkFrom] = useState();
  const [workTo, setWorkTo] = useState();
  const [timeArray, setTimeArray] = useState([]);
  const [selectedTime, setSelectedTime] = useState(timeArray[0]);

  const onTimeChange = (itemValue, itemIndex) => {
    setSelectedTime(itemValue);
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const paymentContinue = () => {
    setPopupVisible(!popupVisible);
    navigation.navigate('PaymentScreen');
  };
  const [chosenDate, setChosenDate] = useState(new Date());

  const showData = () => {
    console.log(data._id);
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
      // setWorkTime(json.worktime.split(','));
      // setWorkTime[1](json.worktime.split(5,10));
      setWorkFrom(json.worktime.slice(0, 5).replace(',', ':'));
      setWorkTo(json.worktime.slice(5).replace(',', ':'));
      console.log(json.workday);
      console.log(json.worktime);
      createTimeArray(workFrom, workTo);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  function createTimeArray(startTime, endTime) {
    const result = [];
    let current = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    while (current < end) {
      const hours = current.getHours().toString().padStart(2, '0');
      const minutes = current.getMinutes().toString().padStart(2, '0');
      result.push(`${hours}:${minutes}`);
      current.setTime(current.getTime() + 30 * 60 * 1000); // add 30 minutes
    }
    // result.push(workTo.replace(',',':'));
    setTimeArray(result);
    console.log(result);
  }

  useEffect(() => {
    fetchData();
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
                fontSize: 24,
              }}>
              {data.name.length > 20
                ? data.name.substring(0, 20) + '...'
                : data.name}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Kanit-Regular',
                fontSize: 16,
              }}>
              {data.expertise}
            </Text>
            {/* <Text>Tel: {data.tel}</Text> */}
            <Text style={{fontFamily: 'Kanit-Regular'}}>
              workplace: {data.workplace}
            </Text>
            {/* <Text></Text> */}
            <Text style={{fontFamily: 'Kanit-Regular'}}>
              Rating: {data.ovr_rating}
            </Text>
            <Text style={{fontFamily: 'Kanit-Regular'}}>
              consultant: {data.consultantNumber}
            </Text>
          </View>
        ) : (
          <Text style={{alignSelf: 'center'}}>Loading...</Text>
        )}
      </View>
      {/* <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          paymentContinue();
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
      <TouchableOpacity
        style={styles.button_Appointment}
        onPress={() => togglePopup()}>
        <Text style={{fontWeight: 'bold'}}>นัดหมาย</Text>
      </TouchableOpacity>
      <Modal visible={popupVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text style={{marginBottom: '6%'}}>Choose appointment time</Text>
          <View style={styles.daysContainer}>
            {workDay.map(day => (
              <TouchableOpacity
                key={day}
                // onPress={() => handleDayPress(day)}
                style={[
                  styles.dayButton,
                  // {backgroundColor: isDaySelected(day) ? 'blue' : 'white'},
                ]}>
                <Text
                  style={[
                    styles.dayText,
                    // {color: isDaySelected(day) ? 'white' : 'black'},
                  ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Picker selectedValue={selectedTime} onValueChange={onTimeChange}>
              {timeArray.map((time, index) => (
                <Picker.Item key={index} label={time} value={time} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => paymentContinue()}>
            <Text>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={togglePopup}>
            <Text>Close</Text>
          </TouchableOpacity>
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
  button_Appointment: {
    alignItems: 'center',
    backgroundColor: '#82E7C9',
    padding: 10,
    marginBottom: '6%',
    borderRadius: 8,
    width: 180,
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: '6%',
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
    borderColor: 'black',
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
  },
});

export default DoctorDetail;
