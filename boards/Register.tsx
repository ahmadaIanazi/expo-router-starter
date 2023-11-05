import executeAuth from '@/events/executeAuth';
import { validateEmail } from '@/validations/validateEmail';
import { validateName } from '@/validations/validateName';
import { validatePassword } from '@/validations/validatePassword';
import BackButton from '@/widgets/BackButton';
import Background from '@/widgets/Background';
import ActionButton from '@/widgets/Button';
import Logo from '@/widgets/Logo';
import Snackbar from '@/widgets/Snackbar';
import { View } from '@/xSetup/ui';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput, useTheme, HelperText } from 'react-native-paper';

export default function Register() {

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [secureText, setSecureText] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { executeSignup } = executeAuth();

  const onSignUpPressed = async () => {
    const emailError = validateEmail(email.value);
    const passwordError = validatePassword(password.value);
    setLoading(true);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setLoading(false);
      return;
    }
    try {
      await executeSignup(email.value, password.value);
    } catch (error: any) {
      console.log('ERROR:', error);
      setLoading(false);
      setError(error);
    }
  };

  const toggleSecureText = () => setSecureText(!secureText);

  return (
    <Background keyboard>
      <BackButton />
      <Logo />
      <Text variant='headlineLarge'>Register</Text>
      <TextInput
        label='Email'
        mode='outlined'
        style={{ width: '100%' }}
        returnKeyType='next'
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        autoCapitalize='none'
        textContentType='emailAddress'
        keyboardType='email-address'
      />
      <HelperText type='error' visible={true}>
        {email.error}
      </HelperText>
      <TextInput
        label='Password'
        mode='outlined'
        returnKeyType='done'
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        secureTextEntry={secureText}
        right={<TextInput.Icon icon={secureText ? 'eye' : 'eye-off'} onPress={toggleSecureText} />}
        style={{ width: '100%' }}
      />
      <HelperText type='error' visible={true}>
        {password.error}
      </HelperText>
      <ActionButton loading={loading} mode='contained' onPress={onSignUpPressed}>
        Next
      </ActionButton>
      <View s='row c'>
        <Text>I already have an account. </Text>
        <Button mode='text' onPress={() => router.push('/Login')}>
          Log in
        </Button>
      </View>
      <Snackbar visible={error?.length > 0} autoDismiss snackbarText={error} />
    </Background>
  );
}
