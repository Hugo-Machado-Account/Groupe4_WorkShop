import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import HomeUser from './pages/home-user/home-user';
import HomeAdmin from './pages/home-admin/home-admin';
import TicketList from './pages/tickets-list/TicketsList';
import CreateForm from './pages/createForm/CreateForm';

const Stack = createStackNavigator();
const UserStack = createStackNavigator();
const AdminStack = createStackNavigator();

function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="HomeUser" component={HomeUser} />
      <UserStack.Screen name="TicketList" component={TicketList} />
      <UserStack.Screen name="CreateForm" component={CreateForm} />
    </UserStack.Navigator>
  );
}

function AdminStackScreen() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen name="HomeAdmin" component={HomeAdmin} />
      <AdminStack.Screen name="TicketList" component={TicketList} />
      <AdminStack.Screen name="CreateForm" component={CreateForm} />
    </AdminStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UserStack" component={UserStackScreen} />
        <Stack.Screen name="AdminStack" component={AdminStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}