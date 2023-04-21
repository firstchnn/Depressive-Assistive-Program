import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimeDropdown = ({ times }) => {
  const [selectedTime, setSelectedTime] = useState(times[0]);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>{selectedTime}</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          {times.map((time) => (
            <TouchableOpacity
              key={time}
              style={styles.dropdownItem}
              onPress={() => selectTime(time)}
            >
              <Text>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
  },
  buttonText: {
    textAlign: 'center',
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default TimeDropdown;
