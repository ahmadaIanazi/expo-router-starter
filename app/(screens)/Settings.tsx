import BackButton from '@/widgets/BackButton'
import Background from '@/widgets/Background'
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function Settings() {
  return (
      <Background>
      <BackButton />
      <Text variant='displayLarge'>Settings Screen</Text>
      </Background>
  )
}
