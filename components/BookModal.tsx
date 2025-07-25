import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

interface Tip {
  id: string;
  title: string;
  content: string;
  practice: string;
}

interface BookModalProps {
  visible: boolean;
  category: {
    title: string;
    icon: string;
    tips: Tip[];
  } | null;
  onClose: () => void;
}

export default function BookModal({ visible, category, onClose }: BookModalProps) {
  if (!category) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.icon}>{category.icon}</Text>
            <Text style={styles.title}>{category.title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {category.tips.map((tip, index) => (
              <View key={tip.id} style={styles.tipCard}>
                <View style={styles.tipHeader}>
                  <Text style={styles.tipNumber}>Tip #{index + 1}</Text>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                </View>
                
                <Text style={styles.tipContent}>{tip.content}</Text>
                
                <View style={styles.practiceBox}>
                  <Text style={styles.practiceLabel}>Practice:</Text>
                  <Text style={styles.practiceText}>{tip.practice}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: PASTEL_16.DARK_BLUE,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: PASTEL_16.YELLOW,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: PASTEL_16.NAVY,
    borderBottomWidth: 2,
    borderBottomColor: PASTEL_16.YELLOW,
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: PASTEL_16.YELLOW,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
  },
  scrollView: {
    padding: 20,
  },
  tipCard: {
    backgroundColor: PASTEL_16.DARK_GRAY,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: FUNKY_FUTURE.NEON_CYAN,
  },
  tipHeader: {
    marginBottom: 10,
  },
  tipNumber: {
    fontSize: 12,
    color: PASTEL_16.LIGHT_GRAY,
    marginBottom: 5,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
  },
  tipContent: {
    fontSize: 16,
    color: PASTEL_16.WHITE,
    lineHeight: 22,
    marginBottom: 15,
  },
  practiceBox: {
    backgroundColor: PASTEL_16.PURPLE,
    padding: 15,
    borderRadius: 10,
  },
  practiceLabel: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_GRAY,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  practiceText: {
    fontSize: 15,
    color: PASTEL_16.WHITE,
    lineHeight: 20,
  },
});