import React from 'react';
import { View, Text } from 'react-native';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

interface ScrollProps {
  position: { x: number; y: number };
  size: number;
  collected: boolean;
}

const Scroll = ({ position, size, collected }: ScrollProps) => {
  if (collected) return null;

  return (
    <View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        backgroundColor: PASTEL_16.YELLOW,
        borderRadius: size / 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: FUNKY_FUTURE.NEON_ORANGE,
        shadowColor: FUNKY_FUTURE.NEON_YELLOW,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 6,
        transform: [{ rotate: '45deg' }],
      }}
    >
      <Text style={{
        fontSize: size * 0.5,
        fontWeight: 'bold',
        color: PASTEL_16.DARK_GRAY,
      }}>
        📜
      </Text>
    </View>
  );
};

export default Scroll;