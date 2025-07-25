import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GameState {
  playerXP: number;
  playerLevel: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completedQuests: string[];
  totalQuestsCompleted: number;
}

const GAME_STATE_KEY = 'social_rpg_game_state';

export const loadGameState = async (): Promise<GameState> => {
  try {
    const savedState = await AsyncStorage.getItem(GAME_STATE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading game state:', error);
  }

  // Return default state
  return {
    playerXP: 0,
    playerLevel: 1,
    difficulty: 'easy',
    completedQuests: [],
    totalQuestsCompleted: 0,
  };
};

export const saveGameState = async (state: GameState): Promise<void> => {
  try {
    await AsyncStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
};

export const addXP = async (amount: number): Promise<GameState> => {
  const state = await loadGameState();
  state.playerXP += amount;
  
  // Level up every 100 XP
  const newLevel = Math.floor(state.playerXP / 100) + 1;
  if (newLevel > state.playerLevel) {
    state.playerLevel = newLevel;
    // You can add level up rewards here
  }
  
  await saveGameState(state);
  return state;
};

export const completeQuest = async (questId: string, xp: number): Promise<GameState> => {
  const state = await loadGameState();
  
  if (!state.completedQuests.includes(questId)) {
    state.completedQuests.push(questId);
    state.totalQuestsCompleted += 1;
    state.playerXP += xp;
    
    // Level up check
    const newLevel = Math.floor(state.playerXP / 100) + 1;
    if (newLevel > state.playerLevel) {
      state.playerLevel = newLevel;
    }
    
    await saveGameState(state);
  }
  
  return state;
};