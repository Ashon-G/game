import React from 'react';
import { View, StyleSheet } from 'react-native';
import TownEngineWithQuests from '../components/TownEngineWithQuests';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TownEngineWithQuests />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});