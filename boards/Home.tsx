import { router } from 'expo-router';

import Appbar from '@/widgets/Appbar';
import Main from '@/widgets/Main';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Text } from 'react-native-paper';

export default function Home() {
  const routeToSettings = () => router.push('/Settings');

  return (
    <>
      <Appbar title='Home' actions={[{ icon: 'cog', onPress: routeToSettings }]} />
      <Main safe='top'>
        
      </Main>
    </>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
