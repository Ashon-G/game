import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Canvas, Rect, Group } from '@shopify/react-native-skia';
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

export default function TownMapCanvas() {
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

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Group>
          {tiles.map((row, y) => 
            row.map((tile, x) => (
              <Rect
                key={`${x}-${y}`}
                x={x * TILE_SIZE}
                y={y * TILE_SIZE}
                width={TILE_SIZE}
                height={TILE_SIZE}
                color={getTileColor(tile.type)}
              />
            ))
          )}
        </Group>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PASTEL_16.DARK_BLUE,
  },
  canvas: {
    width: MAP_WIDTH * TILE_SIZE,
    height: MAP_HEIGHT * TILE_SIZE,
  },
});

// Export the getTile helper
export { getTile };