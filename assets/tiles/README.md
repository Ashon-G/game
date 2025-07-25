# Tileset Assets

This directory should contain the following tileset images:

## Required Tilesets

1. **Cozy Town Tiles** (32x32)
   - Download from: https://shubibubi.itch.io/cozy-town
   - Modern town tileset with seasonal variations
   - Place the PNG files in this directory

2. **CraftPix Modern Town Pack** (32x32)
   - Download from: https://craftpix.net/file/modern-town-32x32/
   - Contemporary building and street tiles
   - Extract and place PNG files here

## File Structure
```
tiles/
├── cozy-town/
│   ├── buildings.png
│   ├── nature.png
│   ├── paths.png
│   └── decorations.png
└── modern-town/
    ├── buildings.png
    ├── streets.png
    └── props.png
```

## Usage
The TownMap component will load these tilesets and render them using expo-phaser.
Currently using placeholder colors until actual tilesets are downloaded.