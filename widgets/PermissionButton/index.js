
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View, Dimensions } from 'react-native';
import { useKeyboard } from '../../hooks/useKeyboard';
import txt from '../../themes/styles/txt';
import themeContext from '../@context/theme';

const { height, width } = Dimensions.get('screen');

const PermissionButton = ({ state, loading, isPhoneNumber, handleOnPress, emailDone, buttonColor }) => {
  const { keyboardOpen, keyboardHeight } = useKeyboard();
  const color = useContext(themeContext)
  const buttonText = 'Ok'

  return loading ? (
    <View
      style={[
        styles.button,
        {
          bottom: keyboardHeight ? keyboardHeight : 0,
          backgroundColor: buttonColor,
        },
      ]}
    >
      <ActivityIndicator size='large' color='white' />
    </View>
  ) : (
    <TouchableHighlight
      underlayColor={'black'}
      onPress={handleOnPress}
      style={[
        styles.button,
        {
          bottom: keyboardHeight ? keyboardHeight : 0,
          backgroundColor: buttonColor,
        },
      ]}
    >
      <Text style={[txt.h2, { color: color.contrast }]}>{buttonText}</Text>
    </TouchableHighlight>
  );
};

export default PermissionButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: width,
    height: height * 0.124,
    borderTopRightRadius: width * 0.0512,
    borderTopLeftRadius: width * 0.0512,
    justifyContent: 'center',
    alignItems: 'center',
  },
});