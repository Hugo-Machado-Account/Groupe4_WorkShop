import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const tickets = [
    { id: '1', description: 'Problème informatique sur un poste' },
    { id: '2', description: 'Porte cassée dans le couloir' },
    // Ajoute d'autres tickets ici
];

export default function TicketsList({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste des Tickets</Text>
            <FlatList
                data={tickets}
                renderItem={({ item }) => (
                    <View style={styles.ticket}>
                        <Text>{item.description}</Text>
                        <Button
                            title="Voir détails"
                            onPress={() => navigation.navigate('TicketDetails', { ticketId: item.id })}
                        />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <Button title="Ajouter un Ticket" onPress={() => { /* Logique pour ajouter un ticket ici */ }} />
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
    ticket: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
});
