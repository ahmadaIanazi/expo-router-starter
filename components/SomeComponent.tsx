import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Paragraph from '@/widgets/Paragraph';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';

export default function SomeComponent() {
  return (
    <View>
      <Button mode='outlined' onPress={() => router.push('/AModal')}>
        To Modal
      </Button>
      <Paragraph>Navigate to Modal Via a component</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({})