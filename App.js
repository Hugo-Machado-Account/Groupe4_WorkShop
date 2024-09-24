import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeAdmin from './pages/home-admin/home-admin';
import CreateForm from './pages/createForm/CreateForm';
import HomeUser from './pages/home-user/home-user';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeUser">
        <Stack.Screen 
          name="HomeUser" 
          component={HomeUser} 
          options={{ title: 'Je signale !' }}
        />
        <Stack.Screen 
          name="CreateForm" 
          component={CreateForm} 
          options={{ title: 'Créer un Ticket' }}
        />
        <Stack.Screen 
          name="HomeAdmin" 
          component={HomeAdmin} 
          options={{ title: 'Je signale !' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;