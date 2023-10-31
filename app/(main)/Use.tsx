import { Button } from 'react-native-paper';
import { bottom } from 'bottom';

export default function App() {

  return <Button onPress={() => bottom.open('One')}> Open </Button>;
}
