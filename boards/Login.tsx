import Background from '@widgets/Background';
import ActionButton from '@widgets/Button';
import Header from '@widgets/Header';
import Logo from '@widgets/Logo';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
// import TextInput from '@widgets/TextInput';
import BackButton from '@widgets/BackButton';

import { validateEmail } from '@validations/validateEmail';
import { validatePassword } from '@validations/validatePassword';

import executeAuth from '@/events/executeAuth';
import Snackbar from '@/widgets/Snackbar';
import { router } from 'expo-router';
import { View } from 'ui';

export default function Login(): React.JSX.Element {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [secureText, setSecureText] = useState(true);

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const colors = useTheme();

  const { executeLogin } = executeAuth()

  const onLoginPressed = async () => {
    const emailError = validateEmail(email.value);
    const passwordError = validatePassword(password.value);
    setLoading(true)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setLoading(false);
      return;
    } 
    try {
      await executeLogin(email.value, password.value)
    } catch (error: any) {
      console.log('ERROR:', error)
      setLoading(false);
      setError(error)
    }
  };

  const toggleSecureText = () => setSecureText(!secureText);

  return (
    <Background keyboard>
      <BackButton />
      <Logo />
      <Header>Login.</Header>
      <TextInput
        label='Email'
        mode='outlined'
        returnKeyType='next'
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        autoCapitalize='none'
        autoComplete='email'
        textContentType='emailAddress'
        keyboardType='email-address'
        style={{ width: '100%' }}
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
      <Button
        style={{ alignSelf: 'flex-end' }}
        mode='text'
        compact
        textColor={colors.colors.tertiary}
        onPress={() => router.push('/Reset')}
      >
        Forgot your password ?
      </Button>
      <ActionButton loading={loading} mode='contained' onPress={onLoginPressed}>
        Log in
      </ActionButton>
      <View s='row ac'>
        <Text>You do not have an account yet ?</Text>
        <Button mode='text' compact onPress={() => router.replace('/Register')}>
          Create
        </Button>
      </View>
      <Snackbar visible={error?.length > 0} autoDismiss snackbarText={error}  />
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: 'blue',
  },
  link: {
    fontWeight: 'bold',
    color: 'pink',
  },
});
