export interface BattleMove {
  id: string;
  name: string;
  displayName: string;
  speed: number;
  effect: number;
  description: string;
  playerPhrase: string;
  npcResponse: string;
}

export const BATTLE_MOVES: BattleMove[] = [
  {
    id: 'ask_fav_food',
    name: 'AskFavFood',
    displayName: 'Ask About Food',
    speed: 5,
    effect: 2,
    description: 'A friendly question about their favorite meal',
    playerPhrase: "What's your favorite food?",
    npcResponse: "Oh, I love pizza! How about you?",
  },
  {
    id: 'tell_joke',
    name: 'TellJoke',
    displayName: 'Tell a Joke',
    speed: 4,
    effect: 3,
    description: 'Share a light-hearted joke to break the ice',
    playerPhrase: "Why don't scientists trust atoms? Because they make up everything!",
    npcResponse: "Haha, that's a good one!",
  },
  {
    id: 'share_story',
    name: 'ShareStory',
    displayName: 'Share a Story',
    speed: 3,
    effect: 4,
    description: 'Tell a personal anecdote to build connection',
    playerPhrase: "Last week I tried cooking for the first time and...",
    npcResponse: "That's amazing! Tell me more!",
  },
  {
    id: 'give_compliment',
    name: 'GiveCompliment',
    displayName: 'Give Compliment',
    speed: 6,
    effect: 2,
    description: 'Offer a genuine compliment',
    playerPhrase: "I really like your positive energy!",
    npcResponse: "Thank you! That's so kind!",
  },
  {
    id: 'ask_opinion',
    name: 'AskOpinion',
    displayName: 'Ask Opinion',
    speed: 4,
    effect: 3,
    description: 'Ask for their thoughts on something',
    playerPhrase: "What do you think about the event today?",
    npcResponse: "It's been really fun! Great turnout!",
  },
];

// NPC moves (similar but with different phrases)
export const NPC_MOVES: BattleMove[] = [
  {
    id: 'npc_weather',
    name: 'CommentWeather',
    displayName: 'Weather Chat',
    speed: 5,
    effect: 2,
    description: 'NPC comments on weather',
    playerPhrase: "",
    npcResponse: "Nice weather we're having today!",
  },
  {
    id: 'npc_question',
    name: 'AskQuestion',
    displayName: 'Ask Question',
    speed: 4,
    effect: 3,
    description: 'NPC asks about you',
    playerPhrase: "",
    npcResponse: "What brings you to this event?",
  },
  {
    id: 'npc_share',
    name: 'ShareInterest',
    displayName: 'Share Interest',
    speed: 3,
    effect: 4,
    description: 'NPC shares their hobby',
    playerPhrase: "",
    npcResponse: "I've been learning to play guitar lately!",
  },
];