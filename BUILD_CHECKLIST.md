# Build Checklist for iPhone Testing

## Pre-Build Steps ✓

### 1. Install EAS CLI (if not installed)
Open your terminal and run:
```bash
npm install -g eas-cli
```

### 2. Create Expo Account
- Go to https://expo.dev/
- Sign up for a free account
- Remember your username and password

### 3. Login to EAS
In your terminal, run:
```bash
eas login
```
Enter your Expo credentials when prompted.

### 4. Initialize EAS (if needed)
Navigate to your project directory:
```bash
cd /Users/simlimyap/Desktop/Geme/social-rpg
```

Then run:
```bash
eas build:configure
```

## Build for Your iPhone 15

### Option A: Direct to Device (Recommended)
Run this command:
```bash
eas build --profile development --platform ios
```

When prompted:
1. Choose "Yes" to generate a new Apple provisioning profile
2. Select your Apple ID when asked
3. Choose your development team
4. The build will start automatically

### Option B: Using Simulator First
If you want to test on simulator first:
```bash
eas build --profile development --platform ios --simulator
```

## What Happens Next

1. **Build Queue**: Your build enters a queue (usually 10-30 minutes)
2. **Build URL**: You'll get a URL to monitor progress
3. **Download**: Once complete, you'll get a download link

## Installing on iPhone 15

### For Development Build:
1. You'll receive a QR code or link
2. Open it on your iPhone 15
3. It will prompt to install the profile
4. Go to Settings > General > VPN & Device Management
5. Trust the developer profile
6. Open the app!

### Alternative: Using Apple Configurator
1. Download Apple Configurator 2 on your Mac
2. Connect iPhone via USB
3. Drag the .ipa file to your device

## Running the App

1. Start the development server on your Mac:
```bash
npm start
```

2. Open the app on your iPhone
3. It should automatically connect if on same WiFi

## Quick Commands Summary

```bash
# Step 1: Login
eas login

# Step 2: Build for device
eas build --profile development --platform ios

# Step 3: After installation, start dev server
npm start
```

## Troubleshooting

### "Apple ID not found"
- You may need to register as an Apple Developer (free)
- Visit: https://developer.apple.com/

### Build Failed
```bash
# Clear cache and retry
eas build --profile development --platform ios --clear-cache
```

### Can't Install on Device
- Make sure you trust the developer certificate in Settings
- Ensure your device UDID is registered (EAS handles this automatically)

## Ready to Build?

Run these commands in order:
1. `cd /Users/simlimyap/Desktop/Geme/social-rpg`
2. `eas login` (if not logged in)
3. `eas build --profile development --platform ios`

The build typically takes 15-30 minutes. You'll receive an email when it's ready!