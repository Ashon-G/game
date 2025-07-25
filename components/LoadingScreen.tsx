import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

interface LoadingScreenProps {
  progress?: number;
}

export default function LoadingScreen({ progress = 0 }: LoadingScreenProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Rotating animation for the emoji
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1
    );

    // Pulsing animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Text style={styles.emoji}>🎮</Text>
      </Animated.View>
      
      <Text style={styles.title}>Social Quest RPG</Text>
      <Text style={styles.subtitle}>Loading your adventure...</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>
      
      <ActivityIndicator 
        size="large" 
        color={FUNKY_FUTURE.NEON_CYAN}
        style={styles.loader}
      />
      
      <Text style={styles.tip}>
        💡 Tip: Start with easy quests to build confidence!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PASTEL_16.DARK_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PASTEL_16.YELLOW,
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: PASTEL_16.LIGHT_GRAY,
    marginBottom: 40,
  },
  progressContainer: {
    width: '80%',
    marginBottom: 30,
  },
  progressBar: {
    height: 10,
    backgroundColor: PASTEL_16.DARK_GRAY,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: PASTEL_16.GRAY,
  },
  progressFill: {
    height: '100%',
    backgroundColor: FUNKY_FUTURE.NEON_GREEN,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_GRAY,
    textAlign: 'center',
    marginTop: 10,
  },
  loader: {
    marginBottom: 40,
  },
  tip: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_GRAY,
    fontStyle: 'italic',
    textAlign: 'center',
    position: 'absolute',
    bottom: 50,
  },
});