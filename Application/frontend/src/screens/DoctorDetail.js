import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
// import CalendarPicker from 'react-native-calendar-picker';

function DoctorDetail({navigation, route}) {
  const [count, setCount] = useState(0);
  const [doctorID, setDoctorID] = useState({});
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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
      console.log(json);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.countContainer_out}>
        {data !== null ? (
          <View style={styles.countContainer}>
            <Text
              style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 24}}>
              {data.name.length > 20
                ? data.name.substring(0, 20) + '...'
                : data.name}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'regular',
                fontSize: 16,
              }}>
              {data.expertise}
            </Text>
            {/* <Text>Tel: {data.tel}</Text> */}
            <Text>workplace: {data.workplace}</Text>
            {/* <Text></Text> */}
            <Text>Rating: {data.ovr_rating}</Text>
            <Text>consultant: {data.consultantNumber}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <DatePicker
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
      />
      <TouchableOpacity
        style={styles.button_Appointment}
        onPress={() => setOpen(true)}>
        <Text style={{fontWeight: 'bold'}}>นัดหมาย</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
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
          {/* <DatePicker
            style={{width: 200}}
            date={appointmentDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // 7 days from now
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => setAppointmentDate(date)}
          /> */}
          <TouchableOpacity style={styles.button} onPress={paymentContinue}>
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
    justifyContent: 'center',
    paddingHorizontal: 10,
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
    alignItems: 'flex-start',
    padding: 10,
    borderColor: 'black',
    // borderWidth:1.5,
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
});

export default DoctorDetail;
