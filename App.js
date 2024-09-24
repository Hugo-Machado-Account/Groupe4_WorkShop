import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import HomeAdmin from './pages/home-admin/home-admin';
<<<<<<< HEAD
import HomeUser from './pages/home-user/home-user';
import CreateTicket from './pages/createForm/CreateForm';
=======
>>>>>>> 5990dcb58762273252fae62579ccda09544e8432

export default function App() {
  return (
    <View style={styles.container}>
      <CreateTicket />
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
