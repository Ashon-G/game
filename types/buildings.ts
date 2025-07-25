export interface Building {
  id: string;
  name: string;
  route: string;
  doorPosition: { x: number; y: number };
  description: string;
}

export const BUILDINGS: Building[] = [
  {
    id: 'spawn_centre',
    name: 'Spawn Centre',
    route: '/spawn-centre',
    doorPosition: { x: 10, y: 10 }, // Center of map
    description: 'Where your journey begins',
  },
  {
    id: 'library',
    name: 'Library',
    route: '/library',
    doorPosition: { x: 3, y: 4 }, // Top-left building door
    description: 'Read tips and wisdom',
  },
  {
    id: 'quest_hall',
    name: 'Quest Hall',
    route: '/quest-hall',
    doorPosition: { x: 16, y: 4 }, // Top-right building door
    description: 'Daily challenges await',
  },
  {
    id: 'event_centre',
    name: 'Event Centre',
    route: '/event-centre',
    doorPosition: { x: 3, y: 15 }, // Bottom-left building door
    description: 'Find social events',
  },
  {
    id: 'challenge_hall',
    name: 'Challenge Hall',
    route: '/challenge-hall',
    doorPosition: { x: 16, y: 15 }, // Bottom-right building door
    description: 'Practice conversations',
  },
  {
    id: 'anon_room',
    name: 'Anonymous Room',
    route: '/anon-room',
    doorPosition: { x: 10, y: 6 }, // Near spawn
    description: 'Chat anonymously',
  },
];