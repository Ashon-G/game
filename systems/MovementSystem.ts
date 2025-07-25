import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../types/tilemap';
import { walkableTiles } from '../data/townMapData';

const MOVE_SPEED = 4; // pixels per frame

export interface Touch {
  type: string;
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

const MovementSystem = (entities: any, { touches, dispatch, time, events }: any) => {
  const player = entities.player;
  if (!player) return entities;

  // Handle control pad events
  if (events && events.length) {
    events.forEach((event: any) => {
      if (event.type === 'move') {
        player.moving = event.direction;
        player.facing = event.direction;
      } else if (event.type === 'stop') {
        player.moving = null;
      }
    });
  }

  // Handle touch/swipe controls (if no control pad input)
  if (!player.moving && touches.filter((t: Touch) => t.type === 'press').length) {
    const touch = touches.find((t: Touch) => t.type === 'press');
    if (touch) {
      const deltaX = touch.event.pageX - (player.position.x + player.size / 2);
      const deltaY = touch.event.pageY - (player.position.y + player.size / 2);
      
      // Determine movement direction based on touch position
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        player.moving = deltaX > 0 ? 'right' : 'left';
      } else {
        player.moving = deltaY > 0 ? 'down' : 'up';
      }
      player.facing = player.moving;
    }
  }

  // Stop movement on release (for touch controls)
  if (!events && touches.filter((t: Touch) => t.type === 'release').length) {
    player.moving = null;
  }

  // Process movement
  if (player.moving) {
    let newX = player.position.x;
    let newY = player.position.y;

    switch (player.moving) {
      case 'up':
        newY -= MOVE_SPEED;
        break;
      case 'down':
        newY += MOVE_SPEED;
        break;
      case 'left':
        newX -= MOVE_SPEED;
        break;
      case 'right':
        newX += MOVE_SPEED;
        break;
    }

    // Calculate grid position
    const gridX = Math.floor((newX + player.size / 2) / TILE_SIZE);
    const gridY = Math.floor((newY + player.size / 2) / TILE_SIZE);

    // Check bounds
    if (newX >= 0 && newX <= (MAP_WIDTH * TILE_SIZE - player.size) &&
        newY >= 0 && newY <= (MAP_HEIGHT * TILE_SIZE - player.size)) {
      
      // Check if tile is walkable
      const tileKey = `tile_${gridX}_${gridY}`;
      const tile = entities[tileKey];
      
      if (tile && tile.walkable) {
        player.position.x = newX;
        player.position.y = newY;
        
        // Update player state based on movement
        if (player.state === 'idle') {
          player.state = 'lean';
        }
        
        // Check for interactive tiles
        if (tile.interactive && tile.tileType === 'scroll') {
          dispatch({ type: 'scroll_collected', gridX, gridY });
        }
      }
    }
  } else {
    // Return to idle when not moving
    player.state = 'idle';
  }

  return entities;
};

export default MovementSystem;