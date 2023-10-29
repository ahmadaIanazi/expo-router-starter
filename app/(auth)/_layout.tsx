import { Stack } from 'expo-router';
import React from 'react';

export default function Home_Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' options={{ animation: 'none' }} />
      <Stack.Screen name='Reset' options={{ animation: 'none' }} />
      <Stack.Screen name='Welcome' options={{ animation: 'fade_from_bottom' }} />
      <Stack.Screen name='Register' options={{ animation: 'none' }} />
    </Stack>
  );
}
