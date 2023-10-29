import React, { useState } from 'react';
import { router } from 'expo-router';
import { validateEmail } from '@/validations/validateEmail';
import Background from '@/widgets/Background';
import BackButton from '@/widgets/BackButton';
import Logo from '@/widgets/Logo';
import Header from '@/widgets/Header';
import TextInput from '@/widgets/TextInput';
import Button from '@/widgets/Button';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState({ value: '', error: '' });

  const sendResetPasswordEmail = () => {
    const emailError = validateEmail(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    router.push('/Login');
  };

  return (
    <Background>
      <BackButton />
      <Logo />
      <Header>Reset your password.</Header>
      <TextInput
        label='Email'
        returnKeyType='done'
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize='none'
        autoCompleteType='email'
        textContentType='emailAddress'
        keyboardType='email-address'
        description='You will receive an email with the reset link.'
      />
      <Button mode='contained' onPress={sendResetPasswordEmail} style={{ marginTop: 16 }}>
        Continue
      </Button>
    </Background>
  );
}
