import { TileType, MAP_WIDTH, MAP_HEIGHT } from '../types/tilemap';

// 0 = grass, 1 = path, 2 = building wall, 3 = door, 4 = water, 5 = tree, 6 = flower, 7 = bench, 8 = scroll
export const townMapLayout: number[][] = Array(MAP_HEIGHT).fill(null).map(() => Array(MAP_WIDTH).fill(0));

// Create a simple town layout
// Add paths
for (let i = 0; i < MAP_WIDTH; i++) {
  townMapLayout[9][i] = 1; // Horizontal path
  townMapLayout[10][i] = 1;
}
for (let i = 0; i < MAP_HEIGHT; i++) {
  townMapLayout[i][9] = 1; // Vertical path
  townMapLayout[i][10] = 1;
}

// Add buildings (simple 3x3 structures)
// Library (top-left)
for (let y = 2; y <= 4; y++) {
  for (let x = 2; x <= 4; x++) {
    townMapLayout[y][x] = 2;
  }
}
townMapLayout[4][3] = 3; // Door

// Quest Hall (top-right)
for (let y = 2; y <= 4; y++) {
  for (let x = 15; x <= 17; x++) {
    townMapLayout[y][x] = 2;
  }
}
townMapLayout[4][16] = 3; // Door

// Event Center (bottom-left)
for (let y = 15; y <= 17; y++) {
  for (let x = 2; x <= 4; x++) {
    townMapLayout[y][x] = 2;
  }
}
townMapLayout[15][3] = 3; // Door

// Challenge Hall (bottom-right)
for (let y = 15; y <= 17; y++) {
  for (let x = 15; x <= 17; x++) {
    townMapLayout[y][x] = 2;
  }
}
townMapLayout[15][16] = 3; // Door

// Add some decorations
townMapLayout[6][6] = 5; // Tree
townMapLayout[7][14] = 5; // Tree
townMapLayout[12][5] = 6; // Flower
townMapLayout[13][13] = 6; // Flower
townMapLayout[8][11] = 7; // Bench
townMapLayout[11][8] = 7; // Bench

// Add scrolls
townMapLayout[5][10] = 8; // Scroll near paths
townMapLayout[10][15] = 8; // Scroll
townMapLayout[14][9] = 8; // Scroll

export const tileTypeMap: { [key: number]: TileType } = {
  0: TileType.GRASS,
  1: TileType.PATH,
  2: TileType.BUILDING_WALL,
  3: TileType.BUILDING_DOOR,
  4: TileType.WATER,
  5: TileType.TREE,
  6: TileType.FLOWER,
  7: TileType.BENCH,
  8: TileType.SCROLL,
};

export const walkableTiles = new Set([
  TileType.GRASS,
  TileType.PATH,
  TileType.BUILDING_DOOR,
  TileType.FLOWER,
]);

export const interactiveTiles = new Set([
  TileType.BUILDING_DOOR,
  TileType.SCROLL,
  TileType.BENCH,
]);