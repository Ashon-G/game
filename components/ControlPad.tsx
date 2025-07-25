import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { PASTEL_16 } from '../constants/colors';

interface ControlPadProps {
  onPress: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onRelease: () => void;
}

export default function ControlPad({ onPress, onRelease }: ControlPadProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.upButton]}
          onPressIn={() => onPress('up')}
          onPressOut={onRelease}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>▲</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton]}
          onPressIn={() => onPress('left')}
          onPressOut={onRelease}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>◄</Text>
        </TouchableOpacity>
        <View style={styles.centerSpace} />
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPressIn={() => onPress('right')}
          onPressOut={onRelease}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>►</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.downButton]}
          onPressIn={() => onPress('down')}
          onPressOut={onRelease}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: PASTEL_16.DARK_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    margin: 2,
    borderWidth: 2,
    borderColor: PASTEL_16.GRAY,
  },
  buttonText: {
    color: PASTEL_16.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerSpace: {
    width: 50,
    height: 50,
    margin: 2,
  },
  upButton: {},
  downButton: {},
  leftButton: {},
  rightButton: {},
});