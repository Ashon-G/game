import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { loadAssets } from '../utils/LoadAssets';
import LoadingScreen from '../components/LoadingScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Simulate progress updates
        setLoadingProgress(0.2);
        
        // Load all assets
        await loadAssets();
        setLoadingProgress(0.8);
        
        // Additional initialization can go here
        // await initializeGameData();
        
        setLoadingProgress(1);
        
        // Artificial delay to show the loading screen
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="library" options={{ headerShown: false }} />
      <Stack.Screen name="quest-hall" options={{ headerShown: false }} />
      <Stack.Screen name="event-centre" options={{ headerShown: false }} />
      <Stack.Screen name="challenge-hall" options={{ headerShown: false }} />
      <Stack.Screen name="spawn-centre" options={{ headerShown: false }} />
      <Stack.Screen name="anon-room" options={{ headerShown: false }} />
      <Stack.Screen name="battle" options={{ headerShown: false }} />
    </Stack>
  );
}