// RootLayout.tsx
import React, { useEffect } from 'react';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { SpaceMono } from '../xSetup/constants/Fonts';
import RootProvider from '../providers/Root';
import { ErrorBoundary } from 'expo-router';
import { useAuthStore } from '@/stores/useAuthStore';
import Initial from './Initial'; // Import the Initial component

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): React.JSX.Element {

  const [loaded, error] = useFonts({
    SpaceMono: SpaceMono,
    ...FontAwesome.font,
  });

  useEffect(() => {
    console.log('#2 ROOT ERROR', error);
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      console.log('#6 ROOT LOADING EFFECT');
      SplashScreen.hideAsync();
    } else {
      console.log('#3 ROOT NOT LOADED');
    }
  }, [loaded]);

  if (!loaded) {
    console.log('#1 ROOT RETURN NULL');
    return <></>;
  }

  return (
    <RootProvider>
      <Initial />
    </RootProvider>
  );
}