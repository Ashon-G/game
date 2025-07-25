import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';
import useXPStore from '../stores/xpStore';

interface EventBookingModalProps {
  visible: boolean;
  event: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EventBookingModal({ 
  visible, 
  event, 
  onClose, 
  onSuccess 
}: EventBookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { addXP } = useXPStore();

  const handleBooking = async () => {
    if (name.trim() && email.trim()) {
      // Award XP for booking an event
      addXP(30);
      
      Alert.alert(
        'Booking Confirmed! 🎉',
        `You've registered for ${event.title}!\n+30 XP earned for taking this brave step!`,
        [{ 
          text: 'Awesome!', 
          onPress: () => {
            onSuccess();
            resetForm();
            onClose();
          }
        }]
      );
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  if (!event) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Book Your Spot</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventLocation}>📍 {event.location}</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor={PASTEL_16.GRAY}
              value={name}
              onChangeText={setName}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={PASTEL_16.GRAY}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Any special requirements? (optional)"
              placeholderTextColor={PASTEL_16.GRAY}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={3}
            />

            <View style={styles.xpNote}>
              <Text style={styles.xpNoteText}>
                🎯 Earn 30 XP for booking this event!
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.bookButton, (!name.trim() || !email.trim()) && styles.disabledButton]}
              onPress={handleBooking}
              disabled={!name.trim() || !email.trim()}
            >
              <Text style={styles.bookButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: PASTEL_16.DARK_BLUE,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: PASTEL_16.LIGHT_BLUE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: PASTEL_16.CYAN,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
  },
  closeButton: {
    fontSize: 24,
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
  },
  eventInfo: {
    padding: 20,
    backgroundColor: PASTEL_16.DARK_GRAY,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    color: PASTEL_16.LIGHT_BLUE,
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 16,
    color: PASTEL_16.LIGHT_GRAY,
  },
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: PASTEL_16.DARK_GRAY,
    color: PASTEL_16.WHITE,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: PASTEL_16.GRAY,
  },
  messageInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  xpNote: {
    backgroundColor: FUNKY_FUTURE.NEON_GREEN,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  xpNoteText: {
    color: PASTEL_16.DARK_BLUE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: PASTEL_16.GREEN,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  bookButtonText: {
    color: PASTEL_16.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});