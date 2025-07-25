import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
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
import MovementSystem from '../systems/MovementSystem';

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

// Create entities for all tiles and player
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
  
  // Create player at spawn point (center of map)
  entities.player = {
    position: { 
      x: Math.floor(MAP_WIDTH / 2) * TILE_SIZE, 
      y: Math.floor(MAP_HEIGHT / 2) * TILE_SIZE 
    },
    size: TILE_SIZE * 0.8, // Slightly smaller than tile
    state: PlayerState.IDLE,
    facing: 'down',
    moving: null,
    renderer: Player,
  };
  
  return entities;
};

export default function TownEngine() {
  const [entities] = useState(createEntities());
  const scrollViewRef = useRef<ScrollView>(null);
  const horizontalScrollRef = useRef<ScrollView>(null);
  
  const handleEvent = (e: any) => {
    if (e.type === 'scroll_collected') {
      Alert.alert(
        'Scroll Collected!',
        'You found a daily quest scroll. Check your quest log!',
        [{ text: 'OK' }]
      );
      // Remove the scroll from the map
      const tileKey = `tile_${e.gridX}_${e.gridY}`;
      if (entities[tileKey]) {
        entities[tileKey].tileType = TileType.GRASS;
        entities[tileKey].color = getTileColor(TileType.GRASS);
        entities[tileKey].interactive = false;
      }
    }
  };
  
  // Auto-scroll to follow player
  const updateCamera = () => {
    const player = entities.player;
    if (player && scrollViewRef.current && horizontalScrollRef.current) {
      const playerCenterX = player.position.x + player.size / 2;
      const playerCenterY = player.position.y + player.size / 2;
      
      // Calculate scroll position to center player
      const scrollX = Math.max(0, playerCenterX - SCREEN_WIDTH / 2);
      const scrollY = Math.max(0, playerCenterY - SCREEN_HEIGHT / 2);
      
      horizontalScrollRef.current.scrollTo({ x: scrollX, animated: true });
      scrollViewRef.current.scrollTo({ y: scrollY, animated: true });
    }
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
              systems={[MovementSystem]}
              onEvent={handleEvent}
              running={true}
            />
          </View>
        </ScrollView>
      </ScrollView>
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
});