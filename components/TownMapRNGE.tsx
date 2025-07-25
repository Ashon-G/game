import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
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

// Create entities for all tiles
const createTileEntities = () => {
  const entities: any = {};
  
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
  
  return entities;
};

export default function TownMapRNGE() {
  const [entities] = useState(createTileEntities());
  
  // Helper function to get tile at coordinates
  const getTile = (x: number, y: number) => {
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) {
      return null;
    }
    return entities[`tile_${x}_${y}`];
  };
  
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.mapContainer}>
            <GameEngine
              style={styles.gameEngine}
              entities={entities}
              systems={[]}
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

// Export the getTile helper
export { getTile };