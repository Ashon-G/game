import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GLView } from 'expo-gl';
import ExpoPhaser from 'expo-phaser';
import { PASTEL_16 } from '../constants/colors';
import { 
  Tile, 
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

export default function TownMap() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const [tiles, setTiles] = useState<Tile[][]>([]);

  // Helper function to get tile at coordinates
  const getTile = (x: number, y: number): Tile | null => {
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) {
      return null;
    }
    return tiles[y]?.[x] || null;
  };

  // Initialize tile data
  useEffect(() => {
    const tileData: Tile[][] = [];
    for (let y = 0; y < MAP_HEIGHT; y++) {
      tileData[y] = [];
      for (let x = 0; x < MAP_WIDTH; x++) {
        const tileValue = townMapLayout[y][x];
        const tileType = tileTypeMap[tileValue];
        tileData[y][x] = {
          x,
          y,
          type: tileType,
          walkable: walkableTiles.has(tileType),
          interactive: interactiveTiles.has(tileType),
        };
      }
    }
    setTiles(tileData);
  }, []);

  const onContextCreate = async (gl: any) => {
    const app = ExpoPhaser.game({ context: gl });
    gameRef.current = app;

    // Wait for Phaser to be ready
    await app.runAsync(async (game: Phaser.Game) => {
      // Configure game
      game.stage.backgroundColor = PASTEL_16.DARK_BLUE;
      
      // Create tilemap graphics
      const graphics = game.add.graphics(0, 0);
      
      // Draw tiles based on type
      for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
          const tileValue = townMapLayout[y][x];
          const tileType = tileTypeMap[tileValue];
          
          // Set color based on tile type
          let color = 0x000000;
          switch (tileType) {
            case TileType.GRASS:
              color = parseInt(PASTEL_16.LIGHT_GREEN.replace('#', '0x'));
              break;
            case TileType.PATH:
              color = parseInt(PASTEL_16.LIGHT_GRAY.replace('#', '0x'));
              break;
            case TileType.BUILDING_WALL:
              color = parseInt(PASTEL_16.GRAY.replace('#', '0x'));
              break;
            case TileType.BUILDING_DOOR:
              color = parseInt(PASTEL_16.ORANGE.replace('#', '0x'));
              break;
            case TileType.WATER:
              color = parseInt(PASTEL_16.LIGHT_BLUE.replace('#', '0x'));
              break;
            case TileType.TREE:
              color = parseInt(PASTEL_16.GREEN.replace('#', '0x'));
              break;
            case TileType.FLOWER:
              color = parseInt(PASTEL_16.PURPLE.replace('#', '0x'));
              break;
            case TileType.BENCH:
              color = parseInt(PASTEL_16.DARK_GRAY.replace('#', '0x'));
              break;
            case TileType.SCROLL:
              color = parseInt(PASTEL_16.YELLOW.replace('#', '0x'));
              break;
          }
          
          graphics.beginFill(color);
          graphics.drawRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          graphics.endFill();
          
          // Draw grid lines for development
          graphics.lineStyle(1, 0x333333, 0.2);
          graphics.drawRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
      
      // Center camera on map
      game.world.setBounds(0, 0, MAP_WIDTH * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
      game.camera.x = (MAP_WIDTH * TILE_SIZE - SCREEN_WIDTH) / 2;
      game.camera.y = (MAP_HEIGHT * TILE_SIZE - SCREEN_HEIGHT) / 2;
    });
  };

  return (
    <View style={styles.container}>
      <GLView
        style={styles.glView}
        onContextCreate={onContextCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PASTEL_16.DARK_BLUE,
  },
  glView: {
    flex: 1,
  },
});

// Export the getTile helper
export { getTile };