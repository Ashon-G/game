import React, { useEffect } from 'react';
import { View } from 'react-native';
import AvatarAnimator, { EmotionState } from './AvatarAnimator';

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

const PlayerWithAnimator = ({ position, size, state, facing }: PlayerProps) => {
  // Map player state to emotion state
  const emotionState: EmotionState = state as EmotionState;

  return (
    <View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size,
        height: size,
      }}
    >
      <AvatarAnimator
        size={size}
        emotion={emotionState}
      />
    </View>
  );
};

export default PlayerWithAnimator;