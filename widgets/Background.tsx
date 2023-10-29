import React, { ReactNode } from 'react';
import { ImageBackground, KeyboardAvoidingView } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Background({ children }: { children: ReactNode }): React.JSX.Element {

  const colors = useTheme()

  return (
    <ImageBackground
      source={require('@xSetup/assets/images/dot.png')}
      resizeMode='repeat'
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: colors.colors.background,
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          padding: 20,
          width: '100%',
          maxWidth: 340,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        behavior='padding'
      >
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}