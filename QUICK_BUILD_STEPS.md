# Quick Build Steps for iPhone 15

## ⚡ Fast Track Instructions

### Step 1: Open Terminal
Open a new terminal window and navigate to your project:
```bash
cd /Users/simlimyap/Desktop/Geme/social-rpg
```

### Step 2: Login to Expo (if needed)
```bash
eas login
```
- Use your Expo account credentials
- If you don't have an account, create one at https://expo.dev/

### Step 3: Start the Build
Run this single command:
```bash
```

### Step 4: Answer the Prompts
You'll be asked a few questions:
1. **"Would you like to automatically create an EAS project?"** → Answer: **Y**
2. **"Generate a new Apple provisioning profile?"** → Answer: **Y**
3. **"Log in to your Apple Developer account"** → Enter your Apple ID
4. **Select your team** → Choose your personal team

### Step 5: Wait for Build
- The build will take 15-30 minutes
- You'll see a URL to track progress
- You'll get an email when it's done

### Step 6: Install on iPhone
When the build is complete:
1. You'll get a QR code or installation link
2. Open it on your iPhone 15
3. Click "Install"
4. Go to Settings > General > VPN & Device Management
5. Trust the developer certificate
6. Open the app!

### Step 7: Run the Dev Server
Back in terminal:
```bash
npm start
```

Your app will connect automatically!

## 🚨 Common Issues & Fixes

### "Command not found: eas"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### "Apple ID issues"
- Make sure you're signed into iCloud on your Mac
- You may need to accept Apple Developer terms at https://developer.apple.com/

### Build Failed
```bash
# Try again with cache cleared
eas build --profile development --platform ios --clear-cache
```

## 📱 That's it!
Your Social Quest RPG will be on your iPhone in about 30 minutes!