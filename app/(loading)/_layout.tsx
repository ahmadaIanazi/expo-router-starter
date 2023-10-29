import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function Loading_layout() {
    console.log('# ----- Loading Layout ---- #')
  return (
    <Stack>
        <Stack.Screen name='Splash' />
        <Stack.Screen name='LoadingUser' />
        <Stack.Screen name='LoadingUserData' />
    </Stack>
  )
}