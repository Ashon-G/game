import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

interface Quest {
  id: string;
  title: string;
  description: string;
  task: string;
  xp: number;
  tips: string[];
}

interface QuestModalProps {
  visible: boolean;
  quest: Quest | null;
  onComplete: (reflection: string) => void;
  onClose: () => void;
}

export default function QuestModal({ visible, quest, onComplete, onClose }: QuestModalProps) {
  const [reflection, setReflection] = useState('');
  const [showReflection, setShowReflection] = useState(false);

  if (!quest) return null;

  const handleAcceptQuest = () => {
    setShowReflection(true);
  };

  const handleSubmitReflection = async () => {
    if (reflection.trim()) {
      // Save reflection to AsyncStorage
      const key = `quest_${quest.id}_${Date.now()}`;
      await AsyncStorage.setItem(key, JSON.stringify({
        questId: quest.id,
        questTitle: quest.title,
        reflection: reflection.trim(),
        completedAt: new Date().toISOString(),
        xpEarned: quest.xp,
      }));

      onComplete(reflection.trim());
      setReflection('');
      setShowReflection(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {!showReflection ? (
              <>
                <Text style={styles.title}>{quest.title}</Text>
                <View style={styles.xpBadge}>
                  <Text style={styles.xpText}>{quest.xp} XP</Text>
                </View>
                
                <Text style={styles.description}>{quest.description}</Text>
                
                <View style={styles.taskContainer}>
                  <Text style={styles.taskLabel}>Your Mission:</Text>
                  <Text style={styles.taskText}>{quest.task}</Text>
                </View>

                <View style={styles.tipsContainer}>
                  <Text style={styles.tipsLabel}>Tips for Success:</Text>
                  {quest.tips.map((tip, index) => (
                    <Text key={index} style={styles.tipText}>• {tip}</Text>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={handleAcceptQuest}
                >
                  <Text style={styles.acceptButtonText}>Accept Quest</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={onClose}
                >
                  <Text style={styles.skipButtonText}>Maybe Later</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title}>Quest Reflection</Text>
                <Text style={styles.reflectionPrompt}>
                  After completing "{quest.task}", how did it make you feel?
                </Text>

                <TextInput
                  style={styles.reflectionInput}
                  multiline
                  numberOfLines={4}
                  placeholder="Share your experience..."
                  placeholderTextColor={PASTEL_16.GRAY}
                  value={reflection}
                  onChangeText={setReflection}
                />

                <TouchableOpacity
                  style={[styles.acceptButton, !reflection.trim() && styles.disabledButton]}
                  onPress={handleSubmitReflection}
                  disabled={!reflection.trim()}
                >
                  <Text style={styles.acceptButtonText}>Complete Quest</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={() => setShowReflection(false)}
                >
                  <Text style={styles.skipButtonText}>Back</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: PASTEL_16.DARK_BLUE,
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,
    borderColor: PASTEL_16.YELLOW,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PASTEL_16.YELLOW,
    textAlign: 'center',
    marginBottom: 10,
  },
  xpBadge: {
    backgroundColor: FUNKY_FUTURE.NEON_GREEN,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 15,
  },
  xpText: {
    color: PASTEL_16.DARK_BLUE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    color: PASTEL_16.WHITE,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  taskContainer: {
    backgroundColor: PASTEL_16.DARK_GRAY,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  taskLabel: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_GRAY,
    marginBottom: 5,
  },
  taskText: {
    fontSize: 18,
    color: PASTEL_16.WHITE,
    fontWeight: '600',
  },
  tipsContainer: {
    marginBottom: 20,
  },
  tipsLabel: {
    fontSize: 16,
    color: PASTEL_16.LIGHT_BLUE,
    marginBottom: 10,
    fontWeight: '600',
  },
  tipText: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_GRAY,
    marginBottom: 5,
    paddingLeft: 10,
  },
  acceptButton: {
    backgroundColor: PASTEL_16.GREEN,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 10,
  },
  acceptButtonText: {
    color: PASTEL_16.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipButtonText: {
    color: PASTEL_16.LIGHT_GRAY,
    fontSize: 16,
    textAlign: 'center',
  },
  reflectionPrompt: {
    fontSize: 16,
    color: PASTEL_16.WHITE,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  reflectionInput: {
    backgroundColor: PASTEL_16.DARK_GRAY,
    color: PASTEL_16.WHITE,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  disabledButton: {
    opacity: 0.5,
  },
});