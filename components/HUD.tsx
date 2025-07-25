import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import useXPStore from '../stores/xpStore';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

export default function HUD() {
  const { xp, level, streak, getXPProgress } = useXPStore();
  const xpProgress = getXPProgress();
  
  // Animations
  const progressAnimation = useSharedValue(0);
  const streakScale = useSharedValue(1);
  const levelBounce = useSharedValue(0);

  // Animate XP bar
  useEffect(() => {
    progressAnimation.value = withSpring(xpProgress);
  }, [xpProgress]);

  // Animate streak stars
  useEffect(() => {
    if (streak > 0) {
      streakScale.value = withSequence(
        withSpring(1.2),
        withSpring(1)
      );
    }
  }, [streak]);

  // Animate level number on level up
  useEffect(() => {
    levelBounce.value = withSequence(
      withSpring(-10),
      withSpring(0)
    );
  }, [level]);

  const xpBarStyle = useAnimatedStyle(() => ({
    width: `${progressAnimation.value * 100}%`,
  }));

  const streakStarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: streakScale.value }],
  }));

  const levelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: levelBounce.value }],
  }));

  // Render streak stars
  const renderStreakStars = () => {
    const stars = [];
    const maxStars = Math.min(streak, 7); // Cap at 7 stars for display
    
    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <Animated.Text
          key={i}
          style={[styles.streakStar, streakStarStyle]}
        >
          ⭐
        </Animated.Text>
      );
    }
    
    if (streak > 7) {
      stars.push(
        <Text key="more" style={styles.streakMore}>
          +{streak - 7}
        </Text>
      );
    }
    
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Level Badge */}
      <Animated.View style={[styles.levelContainer, levelStyle]}>
        <Text style={styles.levelLabel}>LVL</Text>
        <Text style={styles.levelValue}>{level}</Text>
      </Animated.View>

      {/* XP Bar */}
      <View style={styles.xpContainer}>
        <View style={styles.xpBarBackground}>
          <Animated.View style={[styles.xpBarFill, xpBarStyle]} />
        </View>
        <Text style={styles.xpText}>
          {xp % 100} / 100 XP
        </Text>
      </View>

      {/* Streak Display */}
      {streak > 0 && (
        <View style={styles.streakContainer}>
          <Text style={styles.streakLabel}>{streak} day streak!</Text>
          <View style={styles.streakStars}>
            {renderStreakStars()}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: 'rgba(26, 28, 44, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: PASTEL_16.DARK_GRAY,
  },
  levelContainer: {
    backgroundColor: PASTEL_16.PURPLE,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: FUNKY_FUTURE.NEON_PINK,
  },
  levelLabel: {
    fontSize: 10,
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
  },
  levelValue: {
    fontSize: 20,
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
  },
  xpContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  xpBarBackground: {
    height: 20,
    backgroundColor: PASTEL_16.DARK_GRAY,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: PASTEL_16.GRAY,
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: FUNKY_FUTURE.NEON_GREEN,
    borderRadius: 8,
  },
  xpText: {
    fontSize: 12,
    color: PASTEL_16.LIGHT_GRAY,
    textAlign: 'center',
    marginTop: 5,
  },
  streakContainer: {
    alignItems: 'center',
  },
  streakLabel: {
    fontSize: 12,
    color: PASTEL_16.YELLOW,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  streakStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakStar: {
    fontSize: 16,
    marginHorizontal: 2,
  },
  streakMore: {
    fontSize: 12,
    color: PASTEL_16.YELLOW,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});