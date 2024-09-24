import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HomeAdmin from './pages/home-admin/Home-admin';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeAdmin />
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