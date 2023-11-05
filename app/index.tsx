import Logo from '@/widgets/Logo'
import { View } from 'react-native'
import { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';

export default function Splash() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Logo />
      {/* <FacebookLoader active /> */}
    </View>
  );
}