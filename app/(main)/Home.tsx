import executeAuth from "@/events/executeAuth";
import Background from "@/widgets/Background";
import Button from "@/widgets/Button";
import Header from "@/widgets/Header";
import Logo from "@/widgets/Logo";
import Paragraph from "@/widgets/Paragraph";
import Snackbar from "@/widgets/Snackbar";
import { useState } from "react";

import { bottom } from "bottom";

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
    bottom.open('One');
  }
  const openModal2 = () => {
    bottom.open('Two');
  }

  return (
    <Background>
      <Logo />
      <Header>Bottoms</Header>
      <Paragraph>Bottom Sheet for React Native</Paragraph>
      <Button mode='contained' onPress={openModal}>
        Bottom Sheet One
      </Button>
      <Button mode='contained' onPress={openModal2}>
        Bottom Sheet Two
      </Button>
      <Button style={{}} mode='outlined' onPress={logout}>
        Sign out
      </Button>
      <Snackbar snackbarText={error} visible={error.length > 0} />
    </Background>
  );
}
