import * as React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ScoreScreen({ route }) {
  const { score } = route.params;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('HomeScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Score</Text>
      <Text style={styles.score}>Your score: {score}</Text>
      {/* <TouchableOpacity style={styles.button} onPress={handleBackPress}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#008CBA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScoreScreen;
