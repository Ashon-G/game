import { BATTLE_MOVES, NPC_MOVES, BattleMove } from '../data/battleMoves';

export interface BattleState {
  playerConfidence: number;
  npcConfidence: number;
  currentTurn: 'player' | 'npc' | 'selecting';
  selectedMove: BattleMove | null;
  npcMove: BattleMove | null;
  battleLog: string[];
  isAnimating: boolean;
  winner: 'player' | 'npc' | null;
}

const MAX_CONFIDENCE = 10;

const BattleLoop = (entities: any, { events, dispatch, time }: any) => {
  const battle = entities.battle;
  if (!battle || battle.winner) return entities;

  // Handle events
  if (events.length) {
    events.forEach((event: any) => {
      if (event.type === 'select_move' && battle.currentTurn === 'selecting') {
        // Player selected a move
        battle.selectedMove = event.move;
        
        // NPC selects a random move
        battle.npcMove = NPC_MOVES[Math.floor(Math.random() * NPC_MOVES.length)];
        
        // Determine who goes first based on speed
        if (battle.selectedMove.speed >= battle.npcMove.speed) {
          battle.currentTurn = 'player';
        } else {
          battle.currentTurn = 'npc';
        }
        
        battle.isAnimating = true;
        dispatch({ type: 'battle_animation_start' });
      }
    });
  }

  // Process turns
  if (battle.isAnimating && battle.currentTurn !== 'selecting') {
    // Execute move based on whose turn it is
    if (battle.currentTurn === 'player' && battle.selectedMove) {
      // Player attacks
      battle.playerConfidence += battle.selectedMove.effect;
      battle.battleLog.push(`You: "${battle.selectedMove.playerPhrase}"`);
      
      // Show speech bubble
      entities.playerBubble = {
        text: battle.selectedMove.playerPhrase,
        visible: true,
        timer: 120, // frames to show
      };
      
      // Check for victory
      if (battle.playerConfidence >= MAX_CONFIDENCE) {
        battle.winner = 'player';
        dispatch({ type: 'battle_victory', winner: 'player' });
      } else {
        // Switch to NPC turn
        battle.currentTurn = 'npc';
      }
    } else if (battle.currentTurn === 'npc' && battle.npcMove) {
      // NPC attacks
      battle.npcConfidence += battle.npcMove.effect;
      battle.battleLog.push(`Opponent: "${battle.npcMove.npcResponse}"`);
      
      // Show speech bubble
      entities.npcBubble = {
        text: battle.npcMove.npcResponse,
        visible: true,
        timer: 120,
      };
      
      // Check for NPC victory
      if (battle.npcConfidence >= MAX_CONFIDENCE) {
        battle.winner = 'npc';
        dispatch({ type: 'battle_defeat', winner: 'npc' });
      } else {
        // End turn, back to selection
        battle.currentTurn = 'selecting';
        battle.isAnimating = false;
        battle.selectedMove = null;
        battle.npcMove = null;
      }
    }
  }

  // Update speech bubble timers
  if (entities.playerBubble && entities.playerBubble.timer > 0) {
    entities.playerBubble.timer--;
    if (entities.playerBubble.timer <= 0) {
      entities.playerBubble.visible = false;
    }
  }
  
  if (entities.npcBubble && entities.npcBubble.timer > 0) {
    entities.npcBubble.timer--;
    if (entities.npcBubble.timer <= 0) {
      entities.npcBubble.visible = false;
    }
  }

  return entities;
};

export default BattleLoop;