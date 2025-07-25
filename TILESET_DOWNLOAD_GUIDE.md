# Tileset Download Guide

Since the tilesets need to be downloaded manually from their respective sites, follow these steps:

## 1. Cozy Town Tileset
1. Visit: https://shubibubi.itch.io/cozy-town
2. Click "Download Now" (it's free, but you can donate)
3. Extract the ZIP file
4. Copy these files to `assets/tiles/cozy-town/`:
   - buildings.png
   - nature.png
   - paths.png
   - decorations.png

## 2. CraftPix Modern Town Pack
1. Visit: https://craftpix.net/file/modern-town-32x32/
2. Create a free account if needed
3. Download the free pack
4. Extract and copy to `assets/tiles/modern-town/`:
   - tileset.png (or similar named files)

## 3. Alternative Free Resources
If the above are unavailable, try these alternatives:
- OpenGameArt: https://opengameart.org/content/town-tiles
- Kenney.nl: https://kenney.nl/assets (search for "rpg")
- itch.io: Search for "free pixel rpg tileset 32x32"

## 4. Update the Code
Once downloaded, update `components/TownMapRNGE.tsx` to use Image components instead of colored Views:

```tsx
import { Image } from 'react-native';

const TileImage = ({ source, position, size }: any) => {
  return (
    <Image
      source={source}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size,
        height: size,
      }}
    />
  );
};
```

## Current Status
The app currently renders colored tiles as placeholders. Each color represents:
- Light Green: Grass
- Light Gray: Path
- Gray: Building walls
- Orange: Doors
- Yellow: Scrolls (quest pickups)
- Green: Trees
- Purple: Flowers
- Dark Gray: Benches

Run the app with:
```bash
npm start
```

Then scan the QR code with Expo Go on your iPhone 15.