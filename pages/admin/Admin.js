import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native';

export default function Admin() {
    // Gestion de l'état des tickets
    const [tickets, setTickets] = useState([
        {
            id: '1',
            category: 'Problème informatique',
            name: 'John Doe',
            date: '25 Septembre 2024',
            status: 'Validé',
            description: 'Ordinateur ne démarre plus.',
            comment: 'Besoin d’une intervention urgente.',
            imageUrl: 'https://via.placeholder.com/50', // Image d'exemple
        }
    ]);

    // Fonction pour créer un nouveau ticket (exemple)
    const createTicket = () => {
        const newTicket = {
            id: (tickets.length + 1).toString(),
            category: 'Nouveau problème',
            name: 'Admin',
            date: new Date().toLocaleDateString(),
            status: 'En attente',
            description: 'Description du nouveau problème.',
            comment: 'Commentaire associé au problème.',
            imageUrl: 'https://via.placeholder.com/50', // Image d'exemple
        };
        setTickets([...tickets, newTicket]); // Ajoute le nouveau ticket à la liste des tickets
    };

    return (
        <View style={styles.container}>
            {/* Profil administrateur */}
            <Image
                style={styles.avatar}
                source={{ uri: 'https://via.placeholder.com/100' }} // Image de profil d'admin
            />
            <Text style={styles.name}>Administrateur</Text>

            {/* Boutons d'actions */}
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button title="Créer un ticket" onPress={createTicket} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Consultation des tickets" onPress={() => { /* Logic for ticket consultation */ }} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Validation des créations de comptes" onPress={() => { /* Logic for account validation */ }} />
                </View>
            </View>

            {/* Liste des tickets */}
            <FlatList
                data={tickets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.ticket}>
                        {/* Image du problème */}
                        <Image source={{ uri: item.imageUrl }} style={styles.ticketImage} />

                        {/* Détails du ticket */}
                        <View style={styles.ticketDetails}>
                            <Text style={styles.ticketCategory}>{item.category}</Text>
                            <Text style={styles.ticketName}>Nom : {item.name}</Text>
                            <Text style={styles.ticketDate}>Date : {item.date}</Text>
                            <Text style={styles.ticketStatus}>État : {item.status}</Text>
                            <View style={styles.ticketDescriptionContainer}>
                                <Text style={styles.ticketDescription}>{item.description}</Text>
                                <Text style={styles.ticketComment}>{item.comment}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    buttonWrapper: {
        marginBottom: 15, // Espace entre les boutons
    },
    ticket: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    ticketImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    ticketDetails: {
        flex: 1,
    },
    ticketCategory: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ticketName: {
        fontSize: 14,
        marginBottom: 2,
    },
    ticketDate: {
        fontSize: 12,
        color: '#555',
    },
    ticketStatus: {
        fontSize: 12,
        color: 'green',
        marginBottom: 5,
    },
    ticketDescriptionContainer: {
        marginTop: 5,
    },
    ticketDescription: {
        fontSize: 14,
        marginBottom: 2,
        color: '#333',
    },
    ticketComment: {
        fontSize: 12,
        color: '#777',
    },
});
