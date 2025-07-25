const fs = require('fs');
const path = require('path');

// Create a simple placeholder tileset config
const tilesetConfig = {
  name: "placeholder-tileset",
  tileSize: 32,
  tiles: {
    grass: { color: "#a7f070", id: 0 },
    path: { color: "#94b0c2", id: 1 },
    building_wall: { color: "#566c86", id: 2 },
    building_door: { color: "#ef7d57", id: 3 },
    water: { color: "#41a6f6", id: 4 },
    tree: { color: "#38b764", id: 5 },
    flower: { color: "#b13e53", id: 6 },
    bench: { color: "#333c57", id: 7 },
    scroll: { color: "#ffcd75", id: 8 }
  }
};

// Save config
const configPath = path.join(__dirname, '../assets/tiles/tileset-config.json');
fs.writeFileSync(configPath, JSON.stringify(tilesetConfig, null, 2));

console.log('Created tileset configuration at:', configPath);
console.log('\nNext steps:');
console.log('1. Download actual tilesets from:');
console.log('   - Cozy Town: https://shubibubi.itch.io/cozy-town');
console.log('   - Modern Town: https://craftpix.net/file/modern-town-32x32/');
console.log('2. Extract PNG files to assets/tiles/');
console.log('3. Update tileset-config.json with actual file paths');