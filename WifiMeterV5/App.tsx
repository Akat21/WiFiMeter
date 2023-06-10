import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainRoute from './src/Routes/MainRoute';

export default function App() {
  return (
    <NavigationContainer>
      <MainRoute />
    </NavigationContainer>
  );
}