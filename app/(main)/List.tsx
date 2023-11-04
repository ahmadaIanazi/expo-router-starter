import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Background from '@/widgets/Background'
import Header from '@/widgets/Header';

export default function ListRoute(): React.JSX.Element {
  return (
      <Background>
        <Header>Second Tab</Header>
      </Background>
  );
}

const styles = StyleSheet.create({})