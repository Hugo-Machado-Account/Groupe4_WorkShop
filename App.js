import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import HomeAdmin from './pages/home-admin/home-admin';

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
    justifyContent: 'center',
  },
});
