import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ScoreScreen({ route }) {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Score</Text>
      <Text style={styles.score}>Your score: {score}</Text>
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
  },
});

export default ScoreScreen;
