import { Image, StyleSheet, View, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

const PermissionHero = ({ img }) => {

  const image =
    img == 'email'
      ? require('../../../assets/img/hero-email.png')
      : img == 'emailError'
      ? require('../../../assets/img/hero-email-error.png')
      : img == 'password'
      ? require('../../../assets/img/hero-password.png')
      : img == 'passwordError'
      ? require('../../../assets/img/hero-password-error.png')
      : img == 'drop'
      ? require('../../../assets/img/hero-banana-drop.png')
      : img == 'pick'
      ? require('../../../assets/img/hero-banana-pick.png')
      : img == 'Location'
      ? require('../../../assets/img/hero-location.png')
      : img == 'Notification'
      ? require('../../../assets/img/hero-notification.png')
      : img == 'Media'
      ? require('../../../assets/img/photos.png')
      : img == 'Camera'
      ? require('../../../assets/img/camera.png')
      : require('../../../assets/img/loading.png');

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.hero}
        source={image}
      />
    </View>
  );
};

export default PermissionHero;

const styles = StyleSheet.create({
  hero: {
    width: height * 0.38,
    height: height * 0.38,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
