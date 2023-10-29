import { Stack } from 'expo-router';

export default function Screens_layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Settings' options={{ presentation: 'modal'}} />
    </Stack>
  );
}
