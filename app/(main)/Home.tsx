import executeAuth from "@/events/executeAuth";
import Background from "@/widgets/Background";
import Button from "@/widgets/Button";
import Header from "@/widgets/Header";
import Logo from "@/widgets/Logo";
import Paragraph from "@/widgets/Paragraph";
import Snackbar from "@/widgets/Snackbar";
import { router } from "expo-router";
import { useState } from "react";

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

  return (
    <Background>
      <Logo />
      <Header>Welcome 💫</Header>
      <Paragraph>Congratulations you are logged in.</Paragraph>
      <Button
        mode='contained'
        onPress={()=> router.push('/(screens)/Settings')}
      >
        Open Settings
      </Button>
      <Button
        style={{}}
        mode='outlined'
        onPress={logout}
      >
        Sign out
      </Button>
      <Snackbar snackbarText={error} visible={error.length > 0} />
    </Background>
  );
}
