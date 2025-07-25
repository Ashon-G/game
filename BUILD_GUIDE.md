# Social Quest RPG - Build Guide

## Prerequisites
1. Install EAS CLI: `npm install -g eas-cli`
2. Create an Expo account: https://expo.dev/
3. Log in: `eas login`

## iOS Development Build

### 1. Configure your project
```bash
# Initialize EAS in your project (if not done)
eas build:configure
```

### 2. Build for iOS Simulator
```bash
# Development build for iOS Simulator
eas build --profile development --platform ios
```

### 3. Build for Physical Device
```bash
# Development build for physical iOS device
eas build --profile development --platform ios --clear-cache
```

### 4. Download and Install
- Once the build is complete, download the `.app` file (for simulator) or `.ipa` file (for device)
- For Simulator: Drag the `.app` file to the iOS Simulator
- For Device: Use Apple Configurator or TestFlight

## Running the Development Build

### On iOS Simulator:
1. Open the installed app
2. The dev menu will automatically connect to your local server

### On Physical Device:
1. Make sure your device and computer are on the same network
2. Run `npx expo start`
3. Open the app and it should connect automatically

## Asset Preloading

The app preloads the following assets on startup:
- Tile sprites (when added to `assets/tiles/`)
- Character sprites (when added to `assets/sprites/`)
- UI elements (when added to `assets/ui/`)
- Sound effects (when added to `assets/audio/`)

Add your assets to the appropriate directories and update `utils/LoadAssets.ts`.

## Troubleshooting

### Build Fails
- Clear cache: `eas build --clear-cache`
- Check `app.json` for correct bundle identifier
- Ensure all plugins are compatible with SDK 53

### Assets Not Loading
- Check file paths in `LoadAssets.ts`
- Ensure assets are in the correct directories
- Verify asset file formats (PNG, JPG, WAV, MP3)

### Development Client Issues
- Ensure you're using the development build, not Expo Go
- Check that Metro bundler is running
- Verify network connectivity between device and computer

## Production Build

When ready for production:
```bash
eas build --profile production --platform ios
```

This will create an optimized build ready for App Store submission.