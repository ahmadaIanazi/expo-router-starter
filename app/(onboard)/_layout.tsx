import { Stack } from 'expo-router';
import React from 'react';

export default function Onboard_layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Onboarding' options={{ animation: 'none' }} />
    </Stack>
  );
}
