import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import BuildingInterior from '../components/BuildingInterior';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';

const CONVERSATION_STARTERS = [
  "What's something that made you smile today?",
  "If you could master any skill instantly, what would it be?",
  "What's your go-to comfort food?",
  "Describe your perfect weekend in 3 words",
  "What's a small thing that brings you joy?",
];

export default function AnonRoomScreen() {
  const [currentPrompt, setCurrentPrompt] = useState(CONVERSATION_STARTERS[0]);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const getRandomPrompt = () => {
    const newPrompt = CONVERSATION_STARTERS[Math.floor(Math.random() * CONVERSATION_STARTERS.length)];
    setCurrentPrompt(newPrompt);
  };

  const sendMessage = () => {
    if (userMessage.trim()) {
      setMessages([...messages, { text: userMessage, isUser: true }]);
      setUserMessage('');
      
      // Simulate response after delay
      setTimeout(() => {
        const responses = [
          "That's interesting! I feel the same way sometimes.",
          "I never thought about it like that before.",
          "Thanks for sharing! Your perspective is valuable.",
          "I can relate to that. It's nice to know others feel this way too.",
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { text: response, isUser: false }]);
      }, 1500);
    }
  };

  return (
    <BuildingInterior
      title="Anonymous Room"
      description="Practice conversations without pressure"
      backgroundColor={PASTEL_16.PURPLE}
    >
      <View style={styles.container}>
        {!isMatching ? (
          <View style={styles.matchingContainer}>
            <Text style={styles.anonAvatar}>👤</Text>
            <Text style={styles.title}>Anonymous Chat</Text>
            <Text style={styles.description}>
              Connect with someone anonymously to practice conversation skills.
              No names, no pressure, just practice!
            </Text>
            
            <TouchableOpacity 
              style={styles.matchButton}
              onPress={() => setIsMatching(true)}
            >
              <Text style={styles.matchButtonText}>Find Chat Partner</Text>
            </TouchableOpacity>

            <View style={styles.rulesBox}>
              <Text style={styles.rulesTitle}>Chat Rules:</Text>
              <Text style={styles.ruleText}>• Be respectful and kind</Text>
              <Text style={styles.ruleText}>• No personal information</Text>
              <Text style={styles.ruleText}>• Practice active listening</Text>
              <Text style={styles.ruleText}>• It's okay to make mistakes!</Text>
            </View>
          </View>
        ) : (
          <View style={styles.chatContainer}>
            <View style={styles.promptBox}>
              <Text style={styles.promptLabel}>Today's Topic:</Text>
              <Text style={styles.promptText}>{currentPrompt}</Text>
              <TouchableOpacity onPress={getRandomPrompt}>
                <Text style={styles.newPromptButton}>Get New Topic →</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
              {messages.map((msg, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.messageBubble,
                    msg.isUser ? styles.userMessage : styles.otherMessage
                  ]}
                >
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type your message..."
                placeholderTextColor={PASTEL_16.GRAY}
                value={userMessage}
                onChangeText={setUserMessage}
                multiline
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.endChatButton}
              onPress={() => {
                setIsMatching(false);
                setMessages([]);
              }}
            >
              <Text style={styles.endChatText}>End Chat</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </BuildingInterior>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  matchingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anonAvatar: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: PASTEL_16.LIGHT_GRAY,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  matchButton: {
    backgroundColor: FUNKY_FUTURE.NEON_CYAN,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 30,
  },
  matchButtonText: {
    color: PASTEL_16.DARK_BLUE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rulesBox: {
    backgroundColor: PASTEL_16.DARK_BLUE,
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PASTEL_16.YELLOW,
    marginBottom: 10,
  },
  ruleText: {
    fontSize: 14,
    color: PASTEL_16.WHITE,
    marginBottom: 5,
  },
  chatContainer: {
    flex: 1,
  },
  promptBox: {
    backgroundColor: PASTEL_16.DARK_BLUE,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  promptLabel: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_GRAY,
    marginBottom: 5,
  },
  promptText: {
    fontSize: 16,
    color: PASTEL_16.WHITE,
    marginBottom: 10,
  },
  newPromptButton: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_BLUE,
    textAlign: 'right',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  messageBubble: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: PASTEL_16.LIGHT_BLUE,
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: PASTEL_16.DARK_GRAY,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: PASTEL_16.WHITE,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: PASTEL_16.DARK_BLUE,
    color: PASTEL_16.WHITE,
    padding: 15,
    borderRadius: 20,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: PASTEL_16.GREEN,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  sendButtonText: {
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  endChatButton: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  endChatText: {
    color: PASTEL_16.LIGHT_GRAY,
    fontSize: 16,
  },
});