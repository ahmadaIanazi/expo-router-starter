import executeAuth from "@/events/executeAuth";
import Background from "@/widgets/Background";
import Button from "@/widgets/Button";
import Header from "@/widgets/Header";
import Logo from "@/widgets/Logo";
import Paragraph from "@/widgets/Paragraph";
import Snackbar from "@/widgets/Snackbar";
import { useState } from "react";

import { bottom } from "bottoms";
import { router } from "expo-router";

import SomeComponent from "@/components/SomeComponent";

export default function Home() {

  const [error, setError] = useState('')

  const { executeLogout } = executeAuth();

  const logout = async () => {
    try {
      await executeLogout()
    } catch (error : any ){
      setError(error.message)
    }
  }

  const openModal = () => {
    bottom.open('Two');
  }
  const openModal2 = () => {
    bottom.open('Two');
  }

  return (
    <Background>
      {/* <Logo /> */}
      <Header>Home</Header>
      <Paragraph>Expo Router Test</Paragraph>
      <Paragraph> router.push('/(modal)/Modal') </Paragraph>
      <Button mode='contained' onPress={() => router.push('/AModal')}>
        To Modal
      </Button>
      <Paragraph>Navigate to Modal Directly </Paragraph>
      <Paragraph> router.push('/(modal)/Modal') </Paragraph>
      <SomeComponent />
      {/* 
      <Button mode='contained' onPress={openModal}>
        Bottom Sheet One
      </Button>
      <Button mode='contained' onPress={openModal2}>
        Bottom Sheet Two
      </Button>
      <Button style={{}} mode='outlined' onPress={logout}>
        Sign out
      </Button>
      <Snackbar snackbarText={error} visible={error.length > 0} /> */}
    </Background>
  );
}
