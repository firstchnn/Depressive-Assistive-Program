import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {UserContext} from '../components/UserContext';

function SetTimeScreen() {
  const {userData, setUserData} = React.useContext(UserContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);

  const times = [
    '00,00',
    '00,30',
    '01,00',
    '01,30',
    '02,00',
    '03,30',
    '04,00',
    '05,30',
    '06,00',
    '07,30',
    '08,00',
    '09,30',
    '10,00',
    '11,30',
    '12,00',
    '13,30',
    '14,00',
    '15,30',
    '16,00',
    '17,30',
    '18,00',
    '19,30',
    '20,00',
    '21,30',
    '22,00',
    '23,30',
  ];
  const [selectedFrom, setSelectedFrom] = useState(times[0]);
  const [selectedTo, setSelectedTo] = useState(times[0]);

  const onFromChange = (itemValue, itemIndex) => {
    setSelectedFrom(itemValue);
  };
  const onToChange = (itemValue, itemIndex) => {
    setSelectedTo(itemValue);
  };

  const handleCurrentPrice = value => {
    setCurrentPrice(currentPrice + value);
    if (value == 0) {
      setCurrentPrice(0);
    }
  };

  const handleDayPress = day => {
    if (selectedDays.includes(day)) {
      // If the selected day is already in the array, remove it
      setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
    } else {
      // Otherwise, add it to the array
      setSelectedDays([...selectedDays, day]);
    }
    console.log(selectedDays);
  };

  const isDaySelected = day => selectedDays.includes(day);

  function updateDoctor(){
    console.log(selectedDays+' - '+selectedFrom+' - '+selectedTo+' - '+currentPrice);
  }

  return (
    <View style={styles.container}>
      <View style={styles.daysContainer}>
        {daysOfWeek.map(day => (
          <TouchableOpacity
            key={day}
            onPress={() => handleDayPress(day)}
            style={[
              styles.dayButton,
              {backgroundColor: isDaySelected(day) ? 'blue' : 'white'},
            ]}>
            <Text
              style={[
                styles.dayText,
                {color: isDaySelected(day) ? 'white' : 'black'},
              ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View style={{flex: 1, marginRight: 10}}>
          <Text style={{textAlign: 'left', marginLeft: '10%'}}>From:</Text>
          <Picker selectedValue={selectedFrom} onValueChange={onFromChange}>
            {times.map((time, index) => (
              <Picker.Item
                key={index}
                label={time.replace(',', ':')}
                value={time}
              />
            ))}
          </Picker>
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{textAlign: 'left', marginLeft: '10%'}}>To:</Text>
          <Picker selectedValue={selectedTo} onValueChange={onToChange}>
            {times.map((time, index) => (
              <Picker.Item
                key={index}
                label={time.replace(',', ':')}
                value={time}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <Text>
          You will be available from {selectedFrom.replace(',', ':')} to{' '}
          {selectedTo.replace(',', ':')}
        </Text>
      </View>
      <View>
        <View style={styles.daysContainer}>
          <Text>Price : {currentPrice.toString()} THB</Text>
        </View>
        <View style={styles.daysContainer}>
          <TouchableOpacity
            style={styles.dayButton}
            onPress={() => handleCurrentPrice(50)}>
            <Text style={styles.dayText}>+50</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayButton}
            onPress={() => handleCurrentPrice(100)}>
            <Text style={styles.dayText}>+100</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayButton}
            onPress={() => handleCurrentPrice(200)}>
            <Text style={styles.dayText}>+200</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayButton}
            onPress={() => handleCurrentPrice(300)}>
            <Text style={styles.dayText}>+300</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayButton}
            onPress={() => handleCurrentPrice(500)}>
            <Text style={styles.dayText}>+500</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => handleCurrentPrice(0)}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
        <TouchableOpacity style={styles.button}>
          <Text style={{fontFamily:'Kanit-Regular'}}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#F5FCFF',
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
    fontFamily:'Kanit-Bold',
  },
  timeButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
  },
  selectedTimeButton: {
    backgroundColor: '#007aff',
  },
  timeText: {
    textAlign: 'center',
    fontSize: 16,
  },
  selectedTimeText: {
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#82E7C9',
    padding: 10,
    marginBottom: '6%',
    borderRadius:8,
  },
  resetBtn:{
    alignItems: 'center',
    borderColor: '#82E7C9',
    borderWidth:2,
    padding: 10,
    marginVertical: '6%',
    borderRadius:8,
    width:160,
    alignSelf:'center'
  }
});

export default SetTimeScreen;
