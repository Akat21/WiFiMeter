import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WifiSignalMonitor from './WifiSignalMonitor';
import WifiSignalMonitorV2 from './WifiSignalMonitorV2';

export default function App() {
  return (
    <View style={styles.container}>
      <WifiSignalMonitorV2 />
      <StatusBar style="auto" />
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