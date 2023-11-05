import Logo from '@/widgets/Logo'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function Splash() {
  return (
    <View style={{ flex:1, justifyContent: 'center', alignItems:'center'}}>
      {/* <Logo /> */}
      <Text>Splash</Text>
    </View>
  )
}