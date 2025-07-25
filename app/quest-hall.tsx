import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BuildingInterior from '../components/BuildingInterior';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';
import questsData from '../data/quests.json';
import { loadGameState } from '../utils/gameState';

export default function QuestHallScreen() {
  const [dailyQuests, setDailyQuests] = useState<any[]>([]);
  const [gameState, setGameState] = useState<any>(null);

  useEffect(() => {
    loadGameState().then(setGameState);
    
    // Select 3 random quests based on difficulty
    const difficulty = gameState?.difficulty || 'easy';
    const allQuests = questsData[difficulty];
    const shuffled = [...allQuests].sort(() => 0.5 - Math.random());
    setDailyQuests(shuffled.slice(0, 3));
  }, [gameState?.difficulty]);

  const QuestCard = ({ quest, index }: any) => (
    <View style={[styles.questCard, { borderColor: getQuestColor(index) }]}>
      <View style={styles.questHeader}>
        <Text style={styles.questNumber}>Quest #{index + 1}</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>{quest.xp} XP</Text>
        </View>
      </View>
      <Text style={styles.questTitle}>{quest.title}</Text>
      <Text style={styles.questTask}>{quest.task}</Text>
    </View>
  );

  const getQuestColor = (index: number) => {
    const colors = [FUNKY_FUTURE.NEON_PINK, FUNKY_FUTURE.NEON_GREEN, FUNKY_FUTURE.NEON_CYAN];
    return colors[index % colors.length];
  };

  return (
    <BuildingInterior
      title="Quest Hall"
      description="Your daily challenges await!"
      backgroundColor={PASTEL_16.PURPLE}
    >
      <View style={styles.container}>
        <Text style={styles.dailyTitle}>Today's Quests</Text>
        <FlatList
          data={dailyQuests}
          renderItem={({ item, index }) => <QuestCard quest={item} index={index} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.tip}>
          <Text style={styles.tipText}>
            💡 Complete all 3 daily quests for a bonus reward!
          </Text>
        </View>
      </View>
    </BuildingInterior>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  dailyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    textAlign: 'center',
    marginBottom: 20,
  },
  questCard: {
    backgroundColor: PASTEL_16.DARK_BLUE,
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 3,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questNumber: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_GRAY,
    fontWeight: 'bold',
  },
  xpBadge: {
    backgroundColor: FUNKY_FUTURE.NEON_YELLOW,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  xpText: {
    color: PASTEL_16.DARK_BLUE,
    fontWeight: 'bold',
    fontSize: 14,
  },
  questTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PASTEL_16.YELLOW,
    marginBottom: 10,
  },
  questTask: {
    fontSize: 16,
    color: PASTEL_16.WHITE,
    lineHeight: 22,
  },
  tip: {
    backgroundColor: PASTEL_16.DARK_GRAY,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  tipText: {
    fontSize: 16,
    color: PASTEL_16.LIGHT_GRAY,
    textAlign: 'center',
  },
});