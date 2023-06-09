import { StyleSheet, Text, View } from 'react-native';
import WifiSignalMonitorV2 from './src/WifiMeter';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Działa apka</Text>
      <WifiSignalMonitorV2 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
