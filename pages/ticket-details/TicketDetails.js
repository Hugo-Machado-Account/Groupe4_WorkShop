import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TicketDetails({ route, navigation }) {
    const { ticketId } = route.params; // Récupère l'ID du ticket

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Détails du Ticket {ticketId}</Text>
            {/* Affiche les détails du ticket ici */}
            <Button title="Retour" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#d3d3d3',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});
