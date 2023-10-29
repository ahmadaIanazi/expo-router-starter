import Logo from '@/widgets/Logo'
import { View } from 'react-native'

export default function Splash() {
  return (
    <View style={{ flex:1, justifyContent: 'center', alignItems:'center'}}>
      <Logo />
    </View>
  )
}