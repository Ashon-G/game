import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface XPState {
  // State
  xp: number;
  level: number;
  streak: number;
  lastQuestDate: string | null;
  totalQuestsCompleted: number;
  
  // Actions
  addXP: (amount: number) => void;
  updateStreak: () => void;
  completeQuest: (xpReward: number) => void;
  completeBattle: (xpReward: number) => void;
  getXPForNextLevel: () => number;
  getXPProgress: () => number;
  resetStreak: () => void;
}

const XP_PER_LEVEL = 100;

const useXPStore = create<XPState>()(
  persist(
    (set, get) => ({
      // Initial state
      xp: 0,
      level: 1,
      streak: 0,
      lastQuestDate: null,
      totalQuestsCompleted: 0,

      // Add XP and handle level up
      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
          
          // Check if leveled up
          if (newLevel > state.level) {
            // Could trigger level up animation here
            console.log(`Level up! Now level ${newLevel}`);
          }
          
          return {
            xp: newXP,
            level: newLevel,
          };
        });
      },

      // Update streak based on last quest date
      updateStreak: () => {
        const today = new Date().toDateString();
        const state = get();
        
        if (!state.lastQuestDate) {
          // First quest ever
          set({ streak: 1, lastQuestDate: today });
        } else {
          const lastDate = new Date(state.lastQuestDate);
          const todayDate = new Date(today);
          const dayDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (dayDiff === 0) {
            // Already completed a quest today, don't update streak
            return;
          } else if (dayDiff === 1) {
            // Consecutive day! Increment streak
            set({ 
              streak: state.streak + 1, 
              lastQuestDate: today 
            });
          } else {
            // Streak broken, reset to 1
            set({ 
              streak: 1, 
              lastQuestDate: today 
            });
          }
        }
      },

      // Complete a quest
      completeQuest: (xpReward: number) => {
        get().updateStreak();
        get().addXP(xpReward);
        set((state) => ({
          totalQuestsCompleted: state.totalQuestsCompleted + 1,
        }));
      },

      // Complete a battle
      completeBattle: (xpReward: number) => {
        get().addXP(xpReward);
      },

      // Get XP needed for next level
      getXPForNextLevel: () => {
        const state = get();
        return (state.level * XP_PER_LEVEL) - state.xp;
      },

      // Get progress to next level (0-1)
      getXPProgress: () => {
        const state = get();
        const currentLevelXP = (state.level - 1) * XP_PER_LEVEL;
        const nextLevelXP = state.level * XP_PER_LEVEL;
        const progress = (state.xp - currentLevelXP) / (nextLevelXP - currentLevelXP);
        return Math.min(Math.max(progress, 0), 1);
      },

      // Reset streak (for testing or if needed)
      resetStreak: () => {
        set({ streak: 0, lastQuestDate: null });
      },
    }),
    {
      name: 'xp-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useXPStore;