import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { PASTEL_16 } from '../constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BuildingInteriorProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  backgroundColor?: string;
}

export default function BuildingInterior({ 
  title, 
  description, 
  children,
  backgroundColor = PASTEL_16.DARK_GRAY 
}: BuildingInteriorProps) {
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Exit</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {children || (
          <Text style={styles.placeholder}>
            This building is under construction...
          </Text>
        )}
      </View>

      {/* Floor pattern */}
      <View style={styles.floorPattern}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={styles.floorTile} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: PASTEL_16.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  description: {
    fontSize: 16,
    color: PASTEL_16.LIGHT_GRAY,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 18,
    color: PASTEL_16.LIGHT_GRAY,
    textAlign: 'center',
  },
  floorPattern: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.1,
  },
  floorTile: {
    width: SCREEN_WIDTH / 5,
    height: 50,
    backgroundColor: PASTEL_16.DARK_BLUE,
    borderWidth: 1,
    borderColor: PASTEL_16.GRAY,
  },
});