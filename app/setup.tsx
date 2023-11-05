import { Stack } from "expo-router";

export default function Setup(): React.JSX.Element {
  return (
    <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
      {/* === Essentials === */}
      <Stack.Screen name='index' />
      <Stack.Screen name='[missing]' options={{ title: '404 Page not found' }} />
      {/* === Loading === */}
      <Stack.Screen name='(loading)/Splash' />
      <Stack.Screen name='(loading)/LoadingUser' />
      <Stack.Screen name='(loading)/LoadingUserData' />
      {/* === Onboard === */}
      <Stack.Screen name='(onboard)/Onboarding' options={{ animation: 'none' }} />
      {/* === Auth === */}
      <Stack.Screen name='(auth)/Login' options={{ animation: 'none' }} />
      <Stack.Screen name='(auth)/Reset' options={{ animation: 'none' }} />
      <Stack.Screen name='(auth)/Register' options={{ animation: 'none' }} />
      <Stack.Screen name='(auth)/Welcome' options={{ animation: 'fade_from_bottom' }} />
      {/* === Modals Screens === */}
      <Stack.Screen name='(modals)/AModal' options={{ presentation: 'modal' }} />
      <Stack.Screen name='(modals)/Settings' options={{ presentation: 'modal' }} />
    </Stack>
  );
}
