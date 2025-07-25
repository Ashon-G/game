// Pastel-16 palette from Lospec
export const PASTEL_16 = {
  // Background colors
  DARK_BLUE: '#1a1c2c',
  NAVY: '#5d275d',
  PURPLE: '#b13e53',
  
  // Main colors
  ORANGE: '#ef7d57',
  YELLOW: '#ffcd75',
  LIGHT_GREEN: '#a7f070',
  GREEN: '#38b764',
  CYAN: '#257179',
  DARK_CYAN: '#29366f',
  BLUE: '#3b5dc9',
  
  // Light colors
  LIGHT_BLUE: '#41a6f6',
  SKY_BLUE: '#73eff7',
  WHITE: '#f4f4f4',
  LIGHT_GRAY: '#94b0c2',
  GRAY: '#566c86',
  DARK_GRAY: '#333c57',
} as const;

// FunkyFuture 8 for accents
export const FUNKY_FUTURE = {
  NEON_PINK: '#ff006e',
  NEON_ORANGE: '#fb5607',
  NEON_YELLOW: '#ffbe0b',
  NEON_GREEN: '#8ac926',
  NEON_CYAN: '#3a86ff',
  PURPLE: '#c77dff',
  WHITE: '#ffffff',
  BLACK: '#000000',
} as const;

export const theme = {
  background: PASTEL_16.DARK_BLUE,
  primary: PASTEL_16.GREEN,
  secondary: PASTEL_16.LIGHT_BLUE,
  text: PASTEL_16.WHITE,
  textSecondary: PASTEL_16.LIGHT_GRAY,
  accent: FUNKY_FUTURE.NEON_PINK,
} as const;