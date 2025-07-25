export interface Tile {
  x: number;
  y: number;
  type: TileType;
  walkable: boolean;
  interactive?: boolean;
}

export enum TileType {
  GRASS = 'grass',
  PATH = 'path',
  BUILDING_WALL = 'building_wall',
  BUILDING_DOOR = 'building_door',
  WATER = 'water',
  TREE = 'tree',
  FLOWER = 'flower',
  BENCH = 'bench',
  SCROLL = 'scroll',
}

export interface TileMapData {
  width: number;
  height: number;
  tiles: number[][];
  tileSize: number;
}

export const TILE_SIZE = 32;
export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 20;