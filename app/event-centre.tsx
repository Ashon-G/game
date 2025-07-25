import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import BuildingInterior from '../components/BuildingInterior';
import EventBookingModal from '../components/EventBookingModal';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const POSTER_WIDTH = 120;
const POSTER_HEIGHT = 180;
const POSTER_SPACING = 20;

const EVENTS = [
  {
    id: 1,
    title: 'Board Game Night',
    date: 'Every Tuesday, 7 PM',
    location: 'Community Center',
    difficulty: 'easy',
    description: 'Casual board games with friendly people.',
    color: PASTEL_16.GREEN,
    emoji: '🎲',
  },
  {
    id: 2,
    title: 'Coffee & Chat',
    date: 'Saturdays, 10 AM',
    location: 'Local Café',
    difficulty: 'easy',
    description: 'Morning coffee with conversation.',
    color: PASTEL_16.YELLOW,
    emoji: '☕',
  },
  {
    id: 3,
    title: 'Book Club',
    date: 'First Sunday/month',
    location: 'Library',
    difficulty: 'medium',
    description: 'Discuss books in a supportive setting.',
    color: PASTEL_16.PURPLE,
    emoji: '📚',
  },
  {
    id: 4,
    title: 'Hiking Group',
    date: 'Weekends',
    location: 'Various Trails',
    difficulty: 'medium',
    description: 'Nature walks with optional chat.',
    color: PASTEL_16.CYAN,
    emoji: '🥾',
  },
  {
    id: 5,
    title: 'Art Workshop',
    date: 'Thursdays, 6 PM',
    location: 'Art Studio',
    difficulty: 'easy',
    description: 'Create art, no experience needed.',
    color: PASTEL_16.ORANGE,
    emoji: '🎨',
  },
  {
    id: 6,
    title: 'Debate Club',
    date: 'Wednesdays, 7 PM',
    location: 'University Hall',
    difficulty: 'hard',
    description: 'Practice structured arguments.',
    color: PASTEL_16.BLUE,
    emoji: '💬',
  },
];

export default function EventCentreScreen() {
  const scrollX = useSharedValue(0);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [completedBookings, setCompletedBookings] = useState<number[]>([]);

  const handleScroll = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const openBookingModal = (event: any) => {
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    if (selectedEvent) {
      setCompletedBookings([...completedBookings, selectedEvent.id]);
    }
  };

  const PosterCard = ({ item, index }: any) => {
    const inputRange = [
      (index - 1) * (POSTER_WIDTH + POSTER_SPACING),
      index * (POSTER_WIDTH + POSTER_SPACING),
      (index + 1) * (POSTER_WIDTH + POSTER_SPACING),
    ];

    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, 1, 0.8],
        Extrapolate.CLAMP
      );

      const rotate = interpolate(
        scrollX.value,
        inputRange,
        ['-10deg', '0deg', '10deg'],
        Extrapolate.CLAMP
      );

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.6, 1, 0.6],
        Extrapolate.CLAMP
      );

      return {
        transform: [{ scale }, { rotate }],
        opacity,
      };
    });

    const isBooked = completedBookings.includes(item.id);

    return (
      <Animated.View style={[styles.posterContainer, animatedStyle]}>
        <TouchableOpacity
          style={[styles.poster, { backgroundColor: item.color }]}
          onPress={() => openBookingModal(item)}
          activeOpacity={0.9}
        >
          <View style={styles.posterHeader}>
            <Text style={styles.posterEmoji}>{item.emoji}</Text>
          </View>
          
          <View style={styles.posterContent}>
            <Text style={styles.posterTitle}>{item.title}</Text>
            <Text style={styles.posterDate}>{item.date}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
          </View>

          {isBooked && (
            <View style={styles.bookedOverlay}>
              <Text style={styles.bookedText}>✓ Booked</Text>
            </View>
          )}
          
          <View style={styles.posterFooter}>
            <Text style={styles.tapText}>Tap to book →</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return FUNKY_FUTURE.NEON_GREEN;
      case 'medium': return FUNKY_FUTURE.NEON_YELLOW;
      case 'hard': return FUNKY_FUTURE.NEON_PINK;
      default: return PASTEL_16.LIGHT_GRAY;
    }
  };

  return (
    <BuildingInterior
      title="Event Centre"
      description="Find your perfect social adventure"
      backgroundColor={PASTEL_16.CYAN}
    >
      <View style={styles.container}>
        <Text style={styles.instructions}>
          🎫 Swipe through events and tap to book your spot!
        </Text>

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={POSTER_WIDTH + POSTER_SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {EVENTS.map((event, index) => (
            <PosterCard key={event.id} item={event} index={index} />
          ))}
        </Animated.ScrollView>

        <View style={styles.stats}>
          <Text style={styles.statsText}>
            Events Booked: {completedBookings.length} / {EVENTS.length}
          </Text>
        </View>
      </View>

      <EventBookingModal
        visible={showBookingModal}
        event={selectedEvent}
        onClose={() => setShowBookingModal(false)}
        onSuccess={handleBookingSuccess}
      />
    </BuildingInterior>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  instructions: {
    fontSize: 16,
    color: PASTEL_16.WHITE,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  scrollContent: {
    paddingHorizontal: (SCREEN_WIDTH - POSTER_WIDTH) / 2,
    alignItems: 'center',
  },
  posterContainer: {
    marginHorizontal: POSTER_SPACING / 2,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: PASTEL_16.WHITE,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  posterHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  posterEmoji: {
    fontSize: 40,
  },
  posterContent: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  posterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    marginBottom: 5,
    textAlign: 'center',
  },
  posterDate: {
    fontSize: 11,
    color: PASTEL_16.LIGHT_GRAY,
    textAlign: 'center',
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'center',
  },
  difficultyText: {
    fontSize: 10,
    color: PASTEL_16.DARK_BLUE,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  posterFooter: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tapText: {
    fontSize: 12,
    color: PASTEL_16.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bookedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    backgroundColor: PASTEL_16.GREEN,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  stats: {
    marginTop: 30,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
  },
});