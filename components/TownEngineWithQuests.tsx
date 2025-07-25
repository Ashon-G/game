import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Alert, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Audio } from 'expo-av';
import { PASTEL_16 } from '../constants/colors';
import { 
  TileType, 
  TILE_SIZE, 
  MAP_WIDTH, 
  MAP_HEIGHT 
} from '../types/tilemap';
import { 
  townMapLayout, 
  tileTypeMap, 
  walkableTiles, 
  interactiveTiles 
} from '../data/townMapData';
import Player, { PlayerState } from './Player';
import Scroll from './Scroll';
import QuestModal from './QuestModal';
import MovementSystem from '../systems/MovementSystem';
import BuildingCollisionSystem from '../systems/BuildingCollisionSystem';
import useXPStore from '../stores/xpStore';
import HUD from './HUD';
import questsData from '../data/quests.json';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Tile renderer component
const Tile = ({ position, size, color }: any) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        backgroundColor: color,
        borderWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.1)',
      }}
    />
  );
};

// Get color for tile type
const getTileColor = (tileType: TileType): string => {
  switch (tileType) {
    case TileType.GRASS:
      return PASTEL_16.LIGHT_GREEN;
    case TileType.PATH:
      return PASTEL_16.LIGHT_GRAY;
    case TileType.BUILDING_WALL:
      return PASTEL_16.GRAY;
    case TileType.BUILDING_DOOR:
      return PASTEL_16.ORANGE;
    case TileType.WATER:
      return PASTEL_16.LIGHT_BLUE;
    case TileType.TREE:
      return PASTEL_16.GREEN;
    case TileType.FLOWER:
      return PASTEL_16.PURPLE;
    case TileType.BENCH:
      return PASTEL_16.DARK_GRAY;
    case TileType.SCROLL:
      return PASTEL_16.YELLOW;
    default:
      return PASTEL_16.DARK_BLUE;
  }
};

// Fixed scroll positions
const SCROLL_POSITIONS = [
  { x: 5, y: 10 },
  { x: 10, y: 15 },
  { x: 14, y: 9 },
  { x: 3, y: 6 },
  { x: 16, y: 12 },
];

// Create entities for all tiles, player, and scrolls
const createEntities = () => {
  const entities: any = {};
  
  // Create tiles
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const tileValue = townMapLayout[y][x];
      const tileType = tileTypeMap[tileValue];
      const tileKey = `tile_${x}_${y}`;
      
      entities[tileKey] = {
        position: { x: x * TILE_SIZE, y: y * TILE_SIZE },
        size: TILE_SIZE,
        color: getTileColor(tileType),
        tileType,
        gridX: x,
        gridY: y,
        walkable: walkableTiles.has(tileType),
        interactive: interactiveTiles.has(tileType),
        renderer: Tile,
      };
    }
  }
  
  // Create scrolls at fixed positions
  SCROLL_POSITIONS.forEach((pos, index) => {
    entities[`scroll_${index}`] = {
      position: { 
        x: pos.x * TILE_SIZE + TILE_SIZE * 0.25, 
        y: pos.y * TILE_SIZE + TILE_SIZE * 0.25 
      },
      gridX: pos.x,
      gridY: pos.y,
      size: TILE_SIZE * 0.5,
      collected: false,
      renderer: Scroll,
    };
  });
  
  // Create player at spawn point (center of map)
  entities.player = {
    position: { 
      x: Math.floor(MAP_WIDTH / 2) * TILE_SIZE, 
      y: Math.floor(MAP_HEIGHT / 2) * TILE_SIZE 
    },
    size: TILE_SIZE * 0.8,
    state: PlayerState.IDLE,
    facing: 'down',
    moving: null,
    renderer: Player,
  };
  
  return entities;
};

export default function TownEngineWithQuests() {
  const [entities, setEntities] = useState(createEntities());
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [currentQuest, setCurrentQuest] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const horizontalScrollRef = useRef<ScrollView>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  
  const { completeQuest: completeQuestXP } = useXPStore();

  // Load game state on mount
  useEffect(() => {
    
    // Load sound effect (commented out until audio file is added)
    // const loadSound = async () => {
    //   try {
    //     const { sound } = await Audio.Sound.createAsync(
    //       require('../assets/audio/ding.wav'),
    //       { shouldPlay: false }
    //     );
    //     soundRef.current = sound;
    //   } catch (error) {
    //     console.log('Sound loading error:', error);
    //   }
    // };
    
    // loadSound();
    
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Collision detection system
  const ScrollCollisionSystem = (entities: any, { dispatch }: any) => {
    const player = entities.player;
    if (!player || isPaused) return entities;

    // Check collision with scrolls
    SCROLL_POSITIONS.forEach((pos, index) => {
      const scroll = entities[`scroll_${index}`];
      if (scroll && !scroll.collected) {
        const playerGridX = Math.floor((player.position.x + player.size / 2) / TILE_SIZE);
        const playerGridY = Math.floor((player.position.y + player.size / 2) / TILE_SIZE);
        
        if (playerGridX === scroll.gridX && playerGridY === scroll.gridY) {
          dispatch({ type: 'scroll_collected', scrollIndex: index });
        }
      }
    });

    return entities;
  };

  const handleEvent = async (e: any) => {
    if (e.type === 'enter_building') {
      // Pause game when entering building
      setIsPaused(true);
    } else if (e.type === 'scroll_collected') {
      // Pause movement
      setIsPaused(true);
      entities.player.moving = null;
      
      // Mark scroll as collected
      const scrollKey = `scroll_${e.scrollIndex}`;
      setEntities(prev => ({
        ...prev,
        [scrollKey]: { ...prev[scrollKey], collected: true }
      }));
      
      // Select a random quest based on difficulty
      const difficulty = 'easy'; // Default to easy for now
      const quests = questsData[difficulty];
      const randomQuest = quests[Math.floor(Math.random() * quests.length)];
      
      setCurrentQuest(randomQuest);
      setShowQuestModal(true);
      
      // Play sound effect
      if (soundRef.current) {
        await soundRef.current.replayAsync();
      }
    }
  };

  const handleQuestComplete = async (reflection: string) => {
    if (currentQuest) {
      // Update XP using Zustand store
      completeQuestXP(currentQuest.xp);
      
      // Show success message
      Alert.alert(
        'Quest Complete!',
        `You earned ${currentQuest.xp} XP!`,
        [{ text: 'Awesome!' }]
      );
      
      setShowQuestModal(false);
      setCurrentQuest(null);
      setIsPaused(false);
    }
  };

  const handleQuestClose = () => {
    setShowQuestModal(false);
    setCurrentQuest(null);
    setIsPaused(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={horizontalScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.mapContainer}>
            <GameEngine
              style={styles.gameEngine}
              entities={entities}
              systems={[MovementSystem, ScrollCollisionSystem, BuildingCollisionSystem]}
              onEvent={handleEvent}
              running={!isPaused}
            />
          </View>
        </ScrollView>
      </ScrollView>
      
      {/* Enhanced HUD */}
      <HUD />
      
      <QuestModal
        visible={showQuestModal}
        quest={currentQuest}
        onComplete={handleQuestComplete}
        onClose={handleQuestClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PASTEL_16.DARK_BLUE,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mapContainer: {
    width: MAP_WIDTH * TILE_SIZE,
    height: MAP_HEIGHT * TILE_SIZE,
  },
  gameEngine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hud: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpContainer: {
    backgroundColor: PASTEL_16.DARK_GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: PASTEL_16.YELLOW,
  },
  xpLabel: {
    color: PASTEL_16.LIGHT_GRAY,
    fontSize: 12,
  },
  xpValue: {
    color: PASTEL_16.YELLOW,
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelContainer: {
    backgroundColor: PASTEL_16.DARK_GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: PASTEL_16.LIGHT_BLUE,
  },
  levelLabel: {
    color: PASTEL_16.LIGHT_GRAY,
    fontSize: 12,
  },
  levelValue: {
    color: PASTEL_16.LIGHT_BLUE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});