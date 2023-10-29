import React, { useContext, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PermissionButton from '../widgets/PermissionButton';
import PermissionHero from '../widgets/PermissionHero';
import themeContext from '../../themes/theme/theme';
import txt from '../../themes/styles/txt';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useNavigationStore } from '../stores/useNavigationStore';
import { T } from '../../../customized';
import { useRemoteStore } from '../stores/useRemoteStore';
import { permissionData } from '@constants/permissions_setup';

const { height, width } = Dimensions.get('screen');

const Permissions = ({ route }) => {
  const { screenName } = route.params;
  const { shared } = useRemoteStore();
  const navigation = useNavigation();
  const color = useContext(themeContext);
  const buttonColor = color.secondary;
  const { setOnboardPermissions } = useNavigationStore();

  const SKIP = shared?.stop_permissions_onboard;

  useEffect(() => {
    if (SKIP) {
      setOnboardPermissions(true);
      navigation.dispatch(StackActions.replace('MainNavigation'));
    }
  }, [SKIP]); // Add SKIP as a dependency to the effect

  const handleComplete = () => {
    if (screenName === 'Notification') {
      navigation.navigate('PermissionScreen', { screenName: 'Camera' });
    } else if (screenName === 'Camera') {
      navigation.navigate('PermissionScreen', { screenName: 'Media' });
    } else if (screenName === 'Media') {
      navigation.navigate('PermissionScreen', { screenName: 'Location' });
    } else if (screenName === 'Location') {
      setOnboardPermissions(true);
      navigation.dispatch(StackActions.replace('MainNavigation'));
    }
  };


  const { title, text, iconA, iconB, textA, textB } = permissionData[screenName];

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: color.background }]}>
      <View style={styles.textContainer}>
        <View style={[styles.hero, { backgroundColor: color.background }]}>
          <PermissionHero img={screenName} />
        </View>
        <Text style={[txt.h1c, { color: color.text }]}>{title}</Text>
        <Text style={[txt.h4l, { color: color.text }]}>{text}</Text>
        <View style={styles.iconItem}>
          <Image source={iconA} style={styles.icon} />
          <T s='ts-16 b'>{textA}</T>
        </View>
        <View style={styles.iconItem}>
          <Image source={iconB} style={styles.icon} />
          <T s='ts-16 b'>{textB}</T>
        </View>
      </View>
      <PermissionButton buttonColor={buttonColor} handleOnPress={handleComplete} />
    </SafeAreaView>
  );
};

export default Permissions;


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: width * 0.1,
  },
  iconItem: {
    flexDirection: 'row',
    // height: height * 0.05,
    width: '100%',
    marginTop: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    width: height * 0.05,
    height: height * 0.05,
    marginEnd: 15,
  },
  hero: {
    marginTop: 10,
    marginBottom: 20,
    width: height * 0.37,
    height: height * 0.37,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonTouch: {
    bottom: 0,
    width: width,
    alignSelf: 'center',
    position: 'absolute',
  },
});
