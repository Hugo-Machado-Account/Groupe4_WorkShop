import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HomeAdmin from './pages/home-admin/home-admin';
import HomeUser from './pages/home-user/home-user';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeUser />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});