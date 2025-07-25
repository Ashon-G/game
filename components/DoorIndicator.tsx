import React from 'react';
import { View, Text } from 'react-native';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

interface DoorIndicatorProps {
  position: { x: number; y: number };
  size: number;
  label: string;
}

const DoorIndicator = ({ position, size, label }: DoorIndicatorProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y - size * 0.5,
        width: size,
        height: size * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{
        fontSize: size * 0.4,
        color: FUNKY_FUTURE.NEON_YELLOW,
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
      }}>
        ⬇
      </Text>
    </View>
  );
};

export default DoorIndicator;