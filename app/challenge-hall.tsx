import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import BuildingInterior from '../components/BuildingInterior';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

const CHALLENGES = [
  {
    id: 1,
    name: 'Friendly Fred',
    topic: 'Favorite Foods',
    difficulty: 'easy',
    avatar: '🙂',
    prompts: [
      "What's your favorite meal?",
      "Do you like to cook?",
      "Best restaurant you've been to?",
    ],
  },
  {
    id: 2,
    name: 'Curious Casey',
    topic: 'Weekend Plans',
    difficulty: 'easy',
    avatar: '😊',
    prompts: [
      "Any plans for the weekend?",
      "What do you like to do for fun?",
      "Favorite way to relax?",
    ],
  },
  {
    id: 3,
    name: 'Thoughtful Taylor',
    topic: 'Current Events',
    difficulty: 'medium',
    avatar: '🤔',
    prompts: [
      "What's your take on [recent news]?",
      "How do you stay informed?",
      "Any interesting articles lately?",
    ],
  },
  {
    id: 4,
    name: 'Debating Dana',
    topic: 'Technology Impact',
    difficulty: 'hard',
    avatar: '🧐',
    prompts: [
      "Is social media good or bad for society?",
      "AI: helpful tool or potential threat?",
      "Privacy vs convenience - your thoughts?",
    ],
  },
];

export default function ChallengeHallScreen() {
  const router = useRouter();
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const startChallenge = (challenge: any) => {
    // Navigate to battle screen instead of inline challenge
    router.push('/battle');
  };

  const nextPrompt = () => {
    if (currentPromptIndex < selectedChallenge.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    } else {
      // Challenge complete
      setSelectedChallenge(null);
      setCurrentPromptIndex(0);
    }
  };


  return (
    <BuildingInterior
      title="Challenge Hall"
      description="Practice conversations with AI opponents"
      backgroundColor={PASTEL_16.DARK_CYAN}
    >
      <ScrollView style={styles.challengeList} showsVerticalScrollIndicator={false}>
        {CHALLENGES.map((challenge) => (
          <TouchableOpacity 
            key={challenge.id}
            style={styles.challengeCard}
            onPress={() => startChallenge(challenge)}
          >
            <View style={styles.challengeHeader}>
              <Text style={styles.challengeAvatar}>{challenge.avatar}</Text>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeName}>{challenge.name}</Text>
                <Text style={styles.challengeTopic}>Topic: {challenge.topic}</Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) }]}>
                <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BuildingInterior>
  );

  function getDifficultyColor(difficulty: string) {
    switch (difficulty) {
      case 'easy': return FUNKY_FUTURE.NEON_GREEN;
      case 'medium': return FUNKY_FUTURE.NEON_YELLOW;
      case 'hard': return FUNKY_FUTURE.NEON_PINK;
      default: return PASTEL_16.LIGHT_GRAY;
    }
  }
}

const styles = StyleSheet.create({
  challengeList: {
    flex: 1,
    width: '100%',
  },
  challengeCard: {
    backgroundColor: PASTEL_16.DARK_BLUE,
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: PASTEL_16.LIGHT_BLUE,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeAvatar: {
    fontSize: 40,
    marginRight: 15,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
  },
  challengeTopic: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_GRAY,
    marginTop: 5,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  difficultyText: {
    color: PASTEL_16.DARK_BLUE,
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  battleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opponentAvatar: {
    fontSize: 80,
    marginBottom: 20,
  },
  opponentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    marginBottom: 30,
  },
  promptBox: {
    backgroundColor: PASTEL_16.DARK_BLUE,
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: PASTEL_16.LIGHT_BLUE,
    width: '100%',
  },
  promptText: {
    fontSize: 18,
    color: PASTEL_16.WHITE,
    textAlign: 'center',
    lineHeight: 25,
  },
  instruction: {
    fontSize: 16,
    color: PASTEL_16.LIGHT_GRAY,
    fontStyle: 'italic',
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: PASTEL_16.GREEN,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
  },
  nextButtonText: {
    color: PASTEL_16.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  exitButton: {
    paddingVertical: 10,
  },
  exitButtonText: {
    color: PASTEL_16.LIGHT_GRAY,
    fontSize: 16,
  },
});