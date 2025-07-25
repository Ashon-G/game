import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Audio } from 'expo-av';

// Define all assets that need to be preloaded
const imageAssets = [
  // Placeholder icons (will be replaced with actual assets)
  require('../assets/icon.png'),
  require('../assets/splash-icon.png'),
  require('../assets/adaptive-icon.png'),
  require('../assets/favicon.png'),
  
  // Game assets (add actual asset paths when available)
  // require('../assets/tiles/tileset.png'),
  // require('../assets/sprites/avatar_sheet.png'),
  // require('../assets/sprites/npc_sheet.png'),
  // require('../assets/ui/speech_bubble.png'),
  // require('../assets/ui/xp_star.png'),
];

const fontAssets = {
  // Add custom pixel fonts here
  // 'pixel-font': require('../assets/fonts/pixel.ttf'),
};

const audioAssets = [
  // Add audio files when available
  // require('../assets/audio/ding.wav'),
  // require('../assets/audio/level_up.wav'),
  // require('../assets/audio/background_music.mp3'),
];

// Cache images
const cacheImages = (images: any[]) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

// Cache fonts
const cacheFonts = (fonts: { [key: string]: any }) => {
  return Font.loadAsync(fonts);
};

// Cache audio
const cacheAudio = async (sounds: any[]) => {
  const promises = sounds.map(async (sound) => {
    const { sound: audioSound } = await Audio.Sound.createAsync(sound);
    // Unload immediately after caching
    await audioSound.unloadAsync();
  });
  return Promise.all(promises);
};

// Main loading function
export const loadAssets = async () => {
  try {
    // Configure audio for iOS
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    const imagePromises = cacheImages(imageAssets);
    const fontPromise = Object.keys(fontAssets).length > 0 ? cacheFonts(fontAssets) : Promise.resolve();
    const audioPromises = audioAssets.length > 0 ? cacheAudio(audioAssets) : Promise.resolve();

    await Promise.all([
      ...imagePromises,
      fontPromise,
      audioPromises,
    ]);

    return true;
  } catch (error) {
    console.error('Error loading assets:', error);
    // Continue anyway - assets will load on demand
    return true;
  }
};

// Asset manifest for dynamic loading
export const ASSET_MANIFEST = {
  tiles: {
    grass: 'tiles/grass.png',
    path: 'tiles/path.png',
    building: 'tiles/building.png',
    // Add more tile types
  },
  sprites: {
    player: {
      idle: 'sprites/player_idle.png',
      walk: 'sprites/player_walk.png',
      jump: 'sprites/player_jump.png',
    },
    npc: {
      default: 'sprites/npc_default.png',
    },
  },
  ui: {
    speechBubble: 'ui/speech_bubble.png',
    xpStar: 'ui/xp_star.png',
    button: 'ui/button.png',
  },
  audio: {
    ding: 'audio/ding.wav',
    levelUp: 'audio/level_up.wav',
    bgMusic: 'audio/background_music.mp3',
  },
};