import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home({ navigation, route }) {
    // Supposons que le rôle soit passé à cette page via les props ou le route
    // Soit via 'navigation.navigate('Home', { role: 'admin' })' ou un state global
    const { role } = route.params;  // On reçoit le rôle de la page de connexion par exemple

    // Exemple de tickets
    const tickets = [
        {
            id: '1',
            category: 'Problème informatique',
            name: 'John Doe',
            date: '25 Septembre 2024',
            status: 'Validé',
            description: 'Ordinateur ne démarre plus.',
            comment: 'Besoin d’une intervention urgente.',
            imageUrl: 'https://via.placeholder.com/50', // Image d'exemple
        },
        {
            id: '2',
            category: 'Porte cassée',
            name: 'Jane Smith',
            date: '24 Septembre 2024',
            status: 'Non validé',
            description: 'Porte de la salle A101 cassée.',
            comment: 'Serrure endommagée.',
            imageUrl: 'https://via.placeholder.com/50',
        },
    ];

    // Affichage conditionnel selon le rôle
    const isAdmin = role === 'admin';

    return (
        <View style={styles.container}>
            {/* Affichage de la photo et du nom basé sur le rôle */}
            <TouchableOpacity onPress={() => navigation.navigate(isAdmin ? 'Admin' : 'User')}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://via.placeholder.com/100' }} // Photo de profil
                />
                <Text style={styles.name}>{isAdmin ? 'Administrateur' : 'Utilisateur'}</Text>
            </TouchableOpacity>

            {/* Liste des tickets en scroll */}
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
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
        color: '#333',
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
