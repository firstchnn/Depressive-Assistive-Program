import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker'

function DoctorDetail({navigation, route}) {
  const [count, setCount] = useState(0);
  const [doctorID, setDoctorID] = useState({});
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


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
      <View style={styles.countContainer}>
        {data !== null ? (
          <View style={styles.countContainer}>
            <Text>{data.name}</Text>
            <Text>{data.tel}</Text>
            <Text>{data.workplace}</Text>
            <Text>{data.expertise}</Text>
            <Text>{data.ovr_rating}</Text>
            <Text>{data.consultantNumber}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          paymentContinue();
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text>Make Appointment</Text>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: '6%',
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default DoctorDetail;
