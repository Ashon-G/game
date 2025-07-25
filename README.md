# Social Quest RPG

A mobile social role-playing game built with React Native and Expo, featuring quest-based gameplay, social interactions, and immersive storytelling.

## 🎮 Features

- **Quest System**: Dynamic quest generation and progression
- **Social Interactions**: Connect with other players and NPCs
- **Character Customization**: Build and evolve your character
- **Real-time Updates**: Live notifications and social features
- **Cross-platform**: Works on iOS and Android

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or physical device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/geme.git
   cd geme
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Scan the QR code with Expo Go app
   - Or press 'i' for iOS simulator
   - Or press 'a' for Android emulator

## 📱 Building for Production

### iOS Build
Follow the detailed steps in [QUICK_BUILD_STEPS.md](./QUICK_BUILD_STEPS.md)

```bash
eas build --profile development --platform ios
```

### Android Build
```bash
eas build --profile development --platform android
```

## 📁 Project Structure

```
social-rpg/
├── app/                 # Main app screens and navigation
├── components/          # Reusable UI components
├── systems/            # Game systems (quests, combat, etc.)
├── stores/             # State management
├── data/               # Game data and configurations
├── assets/             # Images, audio, and other assets
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── constants/          # App constants and configurations
```

## 🛠️ Development

### Key Technologies
- **React Native**: Mobile app framework
- **Expo**: Development platform and build service
- **TypeScript**: Type-safe JavaScript
- **Zustand**: State management
- **React Navigation**: Screen navigation

### Available Scripts
- `npm start`: Start the development server
- `npm run ios`: Run on iOS simulator
- `npm run android`: Run on Android emulator
- `npm run web`: Run on web browser
- `eas build`: Build for production

## 📚 Documentation

- [Quick Build Steps](./QUICK_BUILD_STEPS.md) - Fast setup for iPhone
- [Build Guide](./BUILD_GUIDE.md) - Detailed build instructions
- [Build Checklist](./BUILD_CHECKLIST.md) - Pre-build verification
- [Assets Reference](./ASSETS_REFERENCE.md) - Asset management guide
- [Tileset Download Guide](./TILESET_DOWNLOAD_GUIDE.md) - Game assets setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
1. Check the [Build Checklist](./BUILD_CHECKLIST.md)
2. Review the [Build Guide](./BUILD_GUIDE.md)
3. Open an issue on GitHub

---

**Happy Questing! 🗡️✨** 