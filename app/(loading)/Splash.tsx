import React from 'react';
import { Text, View } from 'react-native';

export default function Splash() {
  console.log('#-- SPLASH SCREEN --#');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Splash</Text>
    </View>
  );
}
