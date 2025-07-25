import { TILE_SIZE } from '../types/tilemap';
import { BUILDINGS } from '../types/buildings';
import { router } from 'expo-router';

const BuildingCollisionSystem = (entities: any, { dispatch }: any) => {
  const player = entities.player;
  if (!player) return entities;

  // Calculate player's grid position
  const playerGridX = Math.floor((player.position.x + player.size / 2) / TILE_SIZE);
  const playerGridY = Math.floor((player.position.y + player.size / 2) / TILE_SIZE);

  // Check collision with each building door
  BUILDINGS.forEach((building) => {
    if (playerGridX === building.doorPosition.x && playerGridY === building.doorPosition.y) {
      // Pause the game
      dispatch({ type: 'enter_building', building });
      
      // Navigate to building screen
      setTimeout(() => {
        router.push(building.route as any);
      }, 100);
    }
  });

  return entities;
};

export default BuildingCollisionSystem;