import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllTickets, getCurrentUser } from '../../config/firebaseConfig'; // Assurez-vous que le chemin est correct

export default function TicketsList({ navigation }) {
    const [tickets, setTickets] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUserAndTickets = async () => {
            const user = await getCurrentUser();
            setCurrentUser(user);

            if (user) {
                const allTickets = await getAllTickets();
                const userTickets = allTickets.filter(ticket => ticket.id_utilisateur === user.id_utilisateur);
                setTickets(userTickets);
            }
        };

        fetchUserAndTickets();
    }, []);

    const renderTicket = ({ item }) => (
        <TouchableOpacity 
            style={styles.ticket}
            onPress={() => navigation.navigate('TicketDetails', { ticketId: item.id })}
        >
            <View style={styles.ticketHeader}>
                <Icon name="ticket-outline" size={24} color="#007AFF" />
                <Text style={styles.category}>{item.categorie}</Text>
                <View style={[styles.statusBadge, { backgroundColor: item.etat === 'Validé' ? '#4CAF50' : '#FFC107' }]}>
                    <Text style={styles.statusText}>{item.etat}</Text>
                </View>
            </View>
            <View style={styles.ticketBody}>
                <Image source={{ uri: item.photo_url }} style={styles.ticketImage} />
                <View style={styles.ticketInfo}>
                    <Text style={styles.description}>{item.titre}</Text>
                    <Text style={styles.name}>{currentUser ? `${currentUser.prenom} ${currentUser.nom}` : ''}</Text>
                    <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes Tickets</Text>
            <FlatList
                data={tickets}
                renderItem={renderTicket}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F0F0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    ticket: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    ticketHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    ticketBody: {
        flexDirection: 'row',
    },
    ticketImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    ticketInfo: {
        flex: 1,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    name: {
        fontSize: 12,
        color: '#666',
    },
    date: {
        fontSize: 12,
        color: '#666',
    },
    listContainer: {
        paddingBottom: 20,
    },
});