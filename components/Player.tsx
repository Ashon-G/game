import React from 'react';
import { View, Image, Text } from 'react-native';
import { PASTEL_16 } from '../constants/colors';

export enum PlayerState {
  IDLE = 'idle',
  LEAN = 'lean',
  NOD = 'nod',
  JUMP = 'jump',
  REFLECT = 'reflect',
}

interface PlayerProps {
  position: { x: number; y: number };
  size: number;
  state: PlayerState;
  facing: 'up' | 'down' | 'left' | 'right';
}

const Player = ({ position, size, state, facing }: PlayerProps) => {
  // Placeholder sprite colors for different states
  const getStateColor = () => {
    switch (state) {
      case PlayerState.IDLE:
        return PASTEL_16.LIGHT_BLUE;
      case PlayerState.LEAN:
        return PASTEL_16.CYAN;
      case PlayerState.NOD:
        return PASTEL_16.BLUE;
      case PlayerState.JUMP:
        return PASTEL_16.SKY_BLUE;
      case PlayerState.REFLECT:
        return PASTEL_16.PURPLE;
      default:
        return PASTEL_16.LIGHT_BLUE;
    }
  };

  // Simple direction indicator
  const getDirectionIndicator = () => {
    switch (facing) {
      case 'up': return '▲';
      case 'down': return '▼';
      case 'left': return '◄';
      case 'right': return '►';
      default: return '●';
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        backgroundColor: getStateColor(),
        borderRadius: size / 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: PASTEL_16.WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text style={{ 
        color: PASTEL_16.WHITE, 
        fontSize: size / 2,
        fontWeight: 'bold',
      }}>
        {getDirectionIndicator()}
      </Text>
    </View>
  );
};

export default Player;