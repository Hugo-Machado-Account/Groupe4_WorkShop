import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Button, TouchableOpacity } from 'react-native';

// Exemple de données utilisateur
const user = {
    name: "John Doe",
    photo: "https://via.placeholder.com/100", // Remplace par une URL d'image de photo
};

export default function User() {
    const [tickets, setTickets] = useState([
        {
            id: '1',
            category: 'Problème Informatique',
            status: 'Validé',
            date: '2024-09-20',
            description: 'Problème avec le réseau sur le poste 5.',
            comment: 'Vérifier la connexion.',
            problemImage: 'https://via.placeholder.com/100', // Remplace par une image de problème
        },
        {
            id: '2',
            category: 'Porte Cassée',
            status: 'Non Validé',
            date: '2024-09-21',
            description: 'La porte du couloir est cassée.',
            comment: 'Besoin de réparation urgente.',
            problemImage: 'https://via.placeholder.com/100', // Remplace par une image de problème
        },
        {
            id: '3',
            category: 'Flaque d\'Eau',
            status: 'Validé',
            date: '2024-09-22',
            description: 'Flaque d\'eau dans la salle de classe.',
            comment: 'Alerte à la maintenance.',
            problemImage: 'https://via.placeholder.com/100', // Remplace par une image de problème
        },
    ]);

    const addRandomTicket = () => {
        const newTicket = {
            id: (tickets.length + 1).toString(),
            category: `Catégorie aléatoire ${tickets.length + 1}`,
            status: 'Non Validé',
            date: new Date().toISOString().split('T')[0], // Date actuelle
            description: `Description pour ticket numéro ${tickets.length + 1}`,
            comment: 'Pas de commentaire.',
            problemImage: 'https://via.placeholder.com/100', // Remplace par une image de problème
        };
        setTickets([...tickets, newTicket]);
    };

    const deleteTicket = (id) => {
        setTickets(tickets.filter(ticket => ticket.id !== id));
    };

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image source={{ uri: user.photo }} style={styles.photo} />
                <Text style={styles.userName}>{user.name}</Text>
            </View>
            <Text style={styles.ticketsTitle}>Mes Tickets</Text>
            <FlatList
                data={tickets}
                renderItem={({ item }) => (
                    <View style={styles.ticket}>
                        <View style={styles.ticketHeader}>
                            <Image source={{ uri: item.problemImage }} style={styles.ticketImage} />
                            <View style={styles.ticketDetails}>
                                <Text style={styles.category}>{item.category}</Text>
                                <Text style={styles.userName}>{user.name}</Text>
                                <Text style={styles.ticketDate}>{item.date}</Text>
                                <Text style={styles.ticketStatus}>Statut: {item.status}</Text>
                            </View>
                        </View>
                        <View style={styles.ticketDescriptionContainer}>
                            <Text style={styles.ticketDescription}>{item.description}</Text>
                            <Text style={styles.ticketComment}>Commentaire: {item.comment}</Text>
                        </View>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTicket(item.id)}>
                            <Text style={styles.deleteButtonText}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <Button title="Ajouter un Ticket" onPress={addRandomTicket} />
        </View>
    );
}

// Styles CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#d3d3d3',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50, // Pour rendre la photo ronde
        marginRight: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    ticketsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    ticket: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    ticketHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ticketImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    ticketDetails: {
        flex: 1,
    },
    category: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    ticketDate: {
        fontSize: 14,
        color: '#666',
    },
    ticketStatus: {
        fontSize: 14,
        color: '#666',
    },
    ticketDescriptionContainer: {
        marginTop: 10,
    },
    ticketDescription: {
        fontSize: 16,
        color: '#333',
    },
    ticketComment: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#ff4d4d', // Couleur rouge
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
