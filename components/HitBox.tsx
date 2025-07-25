import React from 'react';
import { View } from 'react-native';

interface HitBoxProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible?: boolean; // For debugging
}

const HitBox = ({ position, size, visible = false }: HitBoxProps) => {
  if (!visible) return null;

  // Debug visualization
  return (
    <View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        borderWidth: 2,
        borderColor: 'red',
      }}
    />
  );
};

export default HitBox;