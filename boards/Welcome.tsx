import Button from '@/widgets/Button';
import Background from '@widgets/Background';
import Logo from '@widgets/Logo';
import Paragraph from '@widgets/Paragraph';
import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';

export default function Welcome(): React.JSX.Element {
  const router = useRouter();

  return (
    <Background>
      <Logo />
      <Text variant='headlineLarge'>Expo Router</Text>
      <Paragraph>The Ultimate Starter-kit by Ahmad</Paragraph>
      <Button mode='contained' onPress={() => {
        router.push('/Login')
        router.setParams({ postDatas: 'This is the post data' });
        }}>
        Log in
      </Button>
      <Button mode='outlined' onPress={() => router.push('/Register')}>
        Create an account
      </Button>
    </Background>
  );
}
