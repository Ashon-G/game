# Fix for "No Usable Data" QR Code Error

## Why This Happens
Your app uses native modules (expo-router, react-native-reanimated, etc.) that aren't available in the standard Expo Go app. You need a custom development build.

## Solution: Create a Development Build

### Option 1: Build with EAS (Recommended)
This creates a custom Expo Go app specifically for your project.

```bash
# 1. Install EAS CLI if you haven't already
npm install -g eas-cli

# 2. Login to your Expo account
eas login

# 3. Build for iOS
eas build --profile development --platform ios

# 4. Wait for build (15-30 minutes)
# 5. Install the custom dev client on your iPhone
# 6. Use this custom app instead of Expo Go
```

### Option 2: Run Locally with Xcode
If you have Xcode installed and want to test immediately:

```bash
# 1. Run iOS simulator
npx expo run:ios

# OR for physical device:
# 2. Open ios folder in Xcode
# 3. Connect your iPhone
# 4. Build and run
```

## After Installing Development Build

1. Start your dev server:
```bash
npx expo start --dev-client
```

2. Open your custom development app (not Expo Go)
3. It will automatically connect to your development server

## Quick Check
To verify you need a dev build, run:
```bash
npx expo doctor
```

## What's Different?
- **Expo Go**: Generic app with limited native modules
- **Dev Build**: Custom app with ALL your project's native dependencies

Your Social Quest RPG needs a dev build because it uses:
- expo-router (native navigation)
- react-native-reanimated (native animations)
- @shopify/react-native-skia (native graphics)
- expo-av (native audio)

## Next Steps
1. Create an Expo account at https://expo.dev
2. Run: `eas build --profile development --platform ios`
3. Install the resulting app on your iPhone
4. Use `npx expo start --dev-client` instead of `npx expo start`