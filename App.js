import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import User from "./pages/home-user/User";
//
import Admin from './pages/admin/Admin';
import TicketsList from './pages/tickets-list/TicketsList';
import TicketDetails from './pages/ticket-details/TicketDetails'; // Assure-toi de créer cette page

//
// Créer des pages placeholder pour chaque nouvelle fonctionnalité
function CreateTicket() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Créer un Ticket</Text>
        </View>
    );
}

function ConsultTickets() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Consultation des Tickets</Text>
        </View>
    );
}

function ValidateAccounts() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Validation des comptes</Text>
        </View>
    );
}
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="User" component={User} />
                {/*New*/}
                <Stack.Screen name="Admin" component={Admin} />
                <Stack.Screen name="TicketsList" component={TicketsList} />
                <Stack.Screen name="TicketDetails" component={TicketDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
    },
});
