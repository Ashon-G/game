import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Canvas,
  Image,
  useImage,
  Rect,
  Group,
  useValue,
  useTiming,
  Easing,
} from '@shopify/react-native-skia';
import { PASTEL_16 } from '../constants/colors';

export type EmotionState = 'idle' | 'lean' | 'nod' | 'jump' | 'reflect';

interface AvatarAnimatorProps {
  size: number;
  emotion?: EmotionState;
  onEmotionComplete?: () => void;
}

// Sprite data for each emotion (placeholder - replace with actual sprite positions)
const SPRITE_DATA = {
  idle: {
    frames: 2,
    duration: 1000,
    loop: true,
    // Simulate breathing animation
    getTransform: (progress: number) => ({
      translateY: Math.sin(progress * Math.PI * 2) * 2,
      scale: 1,
      rotate: 0,
    }),
  },
  lean: {
    frames: 1,
    duration: 500,
    loop: false,
    getTransform: (progress: number) => ({
      translateY: 0,
      scale: 1,
      rotate: progress * 15, // Lean to the side
    }),
  },
  nod: {
    frames: 3,
    duration: 600,
    loop: false,
    getTransform: (progress: number) => ({
      translateY: Math.sin(progress * Math.PI * 2) * 10, // Nodding motion
      scale: 1,
      rotate: 0,
    }),
  },
  jump: {
    frames: 4,
    duration: 800,
    loop: false,
    getTransform: (progress: number) => ({
      translateY: -Math.sin(progress * Math.PI) * 30, // Jump arc
      scale: 1 + Math.sin(progress * Math.PI) * 0.1,
      rotate: 0,
    }),
  },
  reflect: {
    frames: 1,
    duration: 2000,
    loop: true,
    getTransform: (progress: number) => ({
      translateY: 0,
      scale: 1,
      rotate: Math.sin(progress * Math.PI * 2) * 5, // Gentle sway
    }),
  },
};

export default function AvatarAnimator({
  size,
  emotion = 'idle',
  onEmotionComplete,
}: AvatarAnimatorProps) {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionState>(emotion);
  const animationProgress = useValue(0);
  
  // For now, we'll use colored rectangles as placeholders for sprites
  // Replace this with actual sprite sheet loading when available
  // const spriteSheet = useImage('/assets/sprites/avatar_sheet.png');

  // Animation timing
  const startAnimation = useCallback(() => {
    const emotionData = SPRITE_DATA[currentEmotion];
    
    animationProgress.current = 0;
    
    useTiming(
      animationProgress,
      { to: 1, duration: emotionData.duration, easing: Easing.inOut(Easing.ease) },
      () => {
        if (emotionData.loop) {
          startAnimation(); // Restart if looping
        } else if (onEmotionComplete) {
          onEmotionComplete();
        }
      }
    );
  }, [currentEmotion, animationProgress, onEmotionComplete]);

  // Handle emotion changes
  useEffect(() => {
    if (emotion !== currentEmotion) {
      setCurrentEmotion(emotion);
    }
  }, [emotion]);

  // Start animation when emotion changes
  useEffect(() => {
    startAnimation();
  }, [currentEmotion, startAnimation]);

  // Get current transform based on animation progress
  const getAnimatedTransform = () => {
    const progress = animationProgress.current;
    const emotionData = SPRITE_DATA[currentEmotion];
    return emotionData.getTransform(progress);
  };

  // Placeholder avatar colors for different emotions
  const getEmotionColor = () => {
    switch (currentEmotion) {
      case 'idle': return PASTEL_16.LIGHT_BLUE;
      case 'lean': return PASTEL_16.CYAN;
      case 'nod': return PASTEL_16.GREEN;
      case 'jump': return PASTEL_16.YELLOW;
      case 'reflect': return PASTEL_16.PURPLE;
      default: return PASTEL_16.LIGHT_BLUE;
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Canvas style={StyleSheet.absoluteFillObject}>
        <Group
          transform={[
            { translateX: size / 2 },
            { translateY: size / 2 },
          ]}
        >
          {/* Placeholder avatar - replace with sprite sheet rendering */}
          <Group
            transform={[
              { translateY: getAnimatedTransform().translateY },
              { scale: getAnimatedTransform().scale },
              { rotate: getAnimatedTransform().rotate },
            ]}
          >
            {/* Body */}
            <Rect
              x={-size / 3}
              y={-size / 3}
              width={size / 1.5}
              height={size / 1.5}
              color={getEmotionColor()}
              style="fill"
            />
            
            {/* Head */}
            <Rect
              x={-size / 4}
              y={-size / 2}
              width={size / 2}
              height={size / 3}
              color={getEmotionColor()}
              style="fill"
            />
            
            {/* Emotion indicator (eyes) */}
            <Rect
              x={-size / 8}
              y={-size / 3}
              width={size / 16}
              height={size / 16}
              color={PASTEL_16.WHITE}
              style="fill"
            />
            <Rect
              x={size / 16}
              y={-size / 3}
              width={size / 16}
              height={size / 16}
              color={PASTEL_16.WHITE}
              style="fill"
            />
          </Group>
        </Group>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});

// Export a hook for controlling the animator from parent components
export const useAvatarEmotion = () => {
  const [emotion, setEmotion] = useState<EmotionState>('idle');
  
  const setEmotionWithCallback = useCallback((
    newEmotion: EmotionState,
    callback?: () => void
  ) => {
    setEmotion(newEmotion);
    
    // If it's a non-looping animation, return to idle after completion
    if (!SPRITE_DATA[newEmotion].loop && callback) {
      setTimeout(() => {
        setEmotion('idle');
        callback();
      }, SPRITE_DATA[newEmotion].duration);
    }
  }, []);
  
  return {
    emotion,
    setEmotion: setEmotionWithCallback,
  };
};