import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BuildingInterior from '../components/BuildingInterior';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

export default function SpawnCentreScreen() {
  return (
    <BuildingInterior
      title="Spawn Centre"
      description="Welcome, Social Warrior!"
      backgroundColor={PASTEL_16.DARK_BLUE}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          This is where your journey begins. Choose your path wisely!
        </Text>
        
        <View style={styles.pathContainer}>
          <TouchableOpacity style={[styles.pathCard, styles.easyPath]}>
            <Text style={styles.pathEmoji}>🌱</Text>
            <Text style={styles.pathTitle}>Gentle Path</Text>
            <Text style={styles.pathDescription}>
              Start with simple greetings and build confidence slowly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.pathCard, styles.mediumPath]}>
            <Text style={styles.pathEmoji}>🌿</Text>
            <Text style={styles.pathTitle}>Balanced Path</Text>
            <Text style={styles.pathDescription}>
              Mix of easy and challenging social interactions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.pathCard, styles.hardPath]}>
            <Text style={styles.pathEmoji}>🌳</Text>
            <Text style={styles.pathTitle}>Bold Path</Text>
            <Text style={styles.pathDescription}>
              Jump into deeper conversations and group settings
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tip}>
          💡 You can change your path anytime in Settings
        </Text>
      </View>
    </BuildingInterior>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: PASTEL_16.WHITE,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 25,
  },
  pathContainer: {
    width: '100%',
  },
  pathCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 3,
    alignItems: 'center',
  },
  easyPath: {
    backgroundColor: PASTEL_16.GREEN,
    borderColor: FUNKY_FUTURE.NEON_GREEN,
  },
  mediumPath: {
    backgroundColor: PASTEL_16.YELLOW,
    borderColor: FUNKY_FUTURE.NEON_YELLOW,
  },
  hardPath: {
    backgroundColor: PASTEL_16.ORANGE,
    borderColor: FUNKY_FUTURE.NEON_PINK,
  },
  pathEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  pathTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PASTEL_16.DARK_BLUE,
    marginBottom: 10,
  },
  pathDescription: {
    fontSize: 14,
    color: PASTEL_16.DARK_BLUE,
    textAlign: 'center',
  },
  tip: {
    fontSize: 16,
    color: PASTEL_16.LIGHT_GRAY,
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
  },
});