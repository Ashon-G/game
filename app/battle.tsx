import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { useRouter } from 'expo-router';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';
import { BATTLE_MOVES } from '../data/battleMoves';
import BattleLoop from '../systems/BattleLoop';
import useXPStore from '../stores/xpStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Avatar component
const Avatar = ({ position, type, confidence }: any) => {
  const isPlayer = type === 'player';
  return (
    <View style={[styles.avatarContainer, { left: position.x, top: position.y }]}>
      <Text style={styles.avatar}>{isPlayer ? '🧑' : '👤'}</Text>
      <View style={styles.confidenceBar}>
        <View 
          style={[
            styles.confidenceFill, 
            { 
              width: `${(confidence / 10) * 100}%`,
              backgroundColor: isPlayer ? FUNKY_FUTURE.NEON_GREEN : FUNKY_FUTURE.NEON_PINK,
            }
          ]} 
        />
      </View>
      <Text style={styles.confidenceText}>{confidence}/10</Text>
    </View>
  );
};

// Speech bubble component
const SpeechBubble = ({ position, text, visible, isPlayer }: any) => {
  if (!visible || !text) return null;
  
  return (
    <View style={[
      styles.speechBubble, 
      { 
        left: position.x, 
        top: position.y,
        backgroundColor: isPlayer ? PASTEL_16.LIGHT_BLUE : PASTEL_16.LIGHT_GRAY,
      }
    ]}>
      <Text style={styles.speechText}>{text}</Text>
      <View style={[
        styles.speechTail,
        {
          backgroundColor: isPlayer ? PASTEL_16.LIGHT_BLUE : PASTEL_16.LIGHT_GRAY,
          transform: isPlayer ? [{ rotate: '45deg' }] : [{ rotate: '-135deg' }],
          [isPlayer ? 'left' : 'right']: 20,
        }
      ]} />
    </View>
  );
};

// Victory animation component
const VictoryAnimation = ({ visible }: any) => {
  const sparkleAnims = Array(5).fill(0).map(() => ({
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(0),
  }));

  useEffect(() => {
    if (visible) {
      sparkleAnims.forEach((anim, index) => {
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.parallel([
            Animated.spring(anim.scale, {
              toValue: 1,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: -50,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.victoryContainer}>
      {sparkleAnims.map((anim, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.sparkle,
            {
              transform: [
                { scale: anim.scale },
                { translateY: anim.translateY },
                { translateX: (index - 2) * 30 },
              ],
              opacity: anim.opacity,
            },
          ]}
        >
          ✨
        </Animated.Text>
      ))}
    </View>
  );
};

export default function BattleScreen() {
  const router = useRouter();
  const [showVictory, setShowVictory] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const { completeBattle } = useXPStore();

  const initialEntities = {
    battle: {
      playerConfidence: 0,
      npcConfidence: 0,
      currentTurn: 'selecting',
      selectedMove: null,
      npcMove: null,
      battleLog: [],
      isAnimating: false,
      winner: null,
    },
    player: {
      position: { x: 50, y: SCREEN_HEIGHT / 2 - 100 },
      type: 'player',
      confidence: 0,
      renderer: Avatar,
    },
    npc: {
      position: { x: SCREEN_WIDTH - 150, y: SCREEN_HEIGHT / 2 - 100 },
      type: 'npc',
      confidence: 0,
      renderer: Avatar,
    },
    playerBubble: {
      position: { x: 20, y: SCREEN_HEIGHT / 2 - 200 },
      text: '',
      visible: false,
      isPlayer: true,
      renderer: SpeechBubble,
    },
    npcBubble: {
      position: { x: SCREEN_WIDTH - 250, y: SCREEN_HEIGHT / 2 - 200 },
      text: '',
      visible: false,
      isPlayer: false,
      renderer: SpeechBubble,
    },
  };

  const [entities] = useState(initialEntities);
  const [gameEngine, setGameEngine] = useState<any>(null);

  const handleEvent = async (e: any) => {
    if (e.type === 'battle_victory') {
      setShowVictory(true);
      setBattleEnded(true);
      completeBattle(50);
      
      setTimeout(() => {
        router.back();
      }, 3000);
    } else if (e.type === 'battle_defeat') {
      setBattleEnded(true);
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  };

  const selectMove = (move: any) => {
    if (gameEngine && entities.battle.currentTurn === 'selecting' && !entities.battle.isAnimating) {
      gameEngine.dispatch({ type: 'select_move', move });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Exit Battle</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Confidence Battle!</Text>
      </View>

      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        style={styles.gameEngine}
        entities={entities}
        systems={[BattleLoop]}
        onEvent={handleEvent}
        running={!battleEnded}
      >
        {/* Battle Arena Background */}
        <View style={styles.arena}>
          <View style={styles.arenaFloor} />
        </View>

        {/* Update confidence values */}
        {entities.player.confidence = entities.battle.playerConfidence}
        {entities.npc.confidence = entities.battle.npcConfidence}
        
        {/* Update speech bubble text */}
        {entities.playerBubble.text = entities.playerBubble.visible ? entities.playerBubble.text : ''}
        {entities.npcBubble.text = entities.npcBubble.visible ? entities.npcBubble.text : ''}
      </GameEngine>

      {/* Move Selection UI */}
      {!battleEnded && entities.battle.currentTurn === 'selecting' && (
        <View style={styles.moveContainer}>
          <Text style={styles.moveTitle}>Choose your move:</Text>
          <View style={styles.moveGrid}>
            {BATTLE_MOVES.slice(0, 4).map((move) => (
              <TouchableOpacity
                key={move.id}
                style={styles.moveButton}
                onPress={() => selectMove(move)}
              >
                <Text style={styles.moveName}>{move.displayName}</Text>
                <View style={styles.moveStats}>
                  <Text style={styles.moveStat}>Speed: {move.speed}</Text>
                  <Text style={styles.moveStat}>Effect: +{move.effect}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Victory Message */}
      {battleEnded && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {entities.battle.winner === 'player' 
              ? '🎉 Victory! +50 XP' 
              : 'Good try! Keep practicing!'}
          </Text>
        </View>
      )}

      <VictoryAnimation visible={showVictory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PASTEL_16.DARK_CYAN,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    textAlign: 'center',
  },
  gameEngine: {
    flex: 1,
  },
  arena: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  arenaFloor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: PASTEL_16.DARK_GRAY,
    borderTopWidth: 4,
    borderTopColor: PASTEL_16.GRAY,
  },
  avatarContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 60,
    marginBottom: 10,
  },
  confidenceBar: {
    width: 80,
    height: 10,
    backgroundColor: PASTEL_16.DARK_GRAY,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: PASTEL_16.WHITE,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  confidenceText: {
    marginTop: 5,
    fontSize: 14,
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
  },
  speechBubble: {
    position: 'absolute',
    padding: 15,
    borderRadius: 15,
    maxWidth: 200,
    borderWidth: 2,
    borderColor: PASTEL_16.WHITE,
  },
  speechText: {
    fontSize: 14,
    color: PASTEL_16.DARK_BLUE,
    fontWeight: '600',
  },
  speechTail: {
    position: 'absolute',
    bottom: -8,
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  moveContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: PASTEL_16.DARK_BLUE,
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,
    borderColor: PASTEL_16.LIGHT_BLUE,
  },
  moveTitle: {
    fontSize: 18,
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  moveGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moveButton: {
    width: '48%',
    backgroundColor: PASTEL_16.GRAY,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: PASTEL_16.LIGHT_GRAY,
  },
  moveName: {
    fontSize: 16,
    color: PASTEL_16.WHITE,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moveStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moveStat: {
    fontSize: 12,
    color: PASTEL_16.LIGHT_GRAY,
  },
  resultContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    textAlign: 'center',
    backgroundColor: PASTEL_16.DARK_BLUE,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: PASTEL_16.YELLOW,
  },
  victoryContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  sparkle: {
    position: 'absolute',
    fontSize: 40,
  },
});