import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function PostDetails() {
    const { id } = useLocalSearchParams()

  return (
    <View>
      <Text>PostDetails: {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})