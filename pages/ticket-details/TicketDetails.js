import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getTicket, updateTicket, deleteTicket, getCurrentUser } from '../../config/firebaseConfig';

const TicketDetails = ({ route, navigation }) => {
    const { ticketId } = route.params;
    const [ticket, setTicket] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [comment, setComment] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const ticketData = await getTicket(ticketId);
            setTicket(ticketData);
            setEditedDescription(ticketData.description);
            const userData = await getCurrentUser();
            setCurrentUser(userData);
        };

        fetchData();
    }, [ticketId]);

    const isAdmin = currentUser && currentUser.type === 'administrateur';
    const isOwner = currentUser && currentUser.id_utilisateur === ticket?.id_utilisateur;
    const canEdit = isAdmin || isOwner;

    const handleUpdate = async () => {
        if (!canEdit) return;

        let updatedTicket = { ...ticket };

        if (isAdmin) {
            updatedTicket = {
                ...updatedTicket,
                etat: 'Validé',
                commentaire: comment
            };
        } else if (isOwner) {
            updatedTicket = {
                ...updatedTicket,
                description: editedDescription
            };
        }

        try {
            await updateTicket(ticketId, updatedTicket);
            setTicket(updatedTicket);
            setIsEditing(false);
            Alert.alert('Succès', 'Le ticket a été mis à jour avec succès.');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du ticket:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du ticket.');
        }
    };

    const handleDelete = async () => {
        if (!isOwner) return;

        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir supprimer ce ticket ?",
            [
                { text: "Annuler", style: "cancel" },
                { text: "Oui", onPress: async () => {
                    try {
                        await deleteTicket(ticketId);
                        Alert.alert("Succès", "Le ticket a été supprimé avec succès.");
                        navigation.goBack();
                    } catch (error) {
                        console.error('Erreur lors de la suppression du ticket:', error);
                        Alert.alert("Erreur", "Une erreur est survenue lors de la suppression du ticket.");
                    }
                }}
            ]
        );
    };

    if (!ticket || !currentUser) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Chargement...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Détails du Ticket</Text>
            <Image source={{ uri: ticket.photo_url }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Catégorie:</Text>
                <Text style={styles.value}>{ticket.categorie}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Titre:</Text>
                <Text style={styles.value}>{ticket.titre}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Description:</Text>
                {isEditing && isOwner ? (
                    <TextInput
                        style={styles.input}
                        value={editedDescription}
                        onChangeText={setEditedDescription}
                        multiline
                    />
                ) : (
                    <Text style={styles.value}>{ticket.description}</Text>
                )}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>État:</Text>
                <Text style={[styles.value, styles.status, { color: ticket.etat === 'Validé' ? '#4CAF50' : '#FFC107' }]}>
                    {ticket.etat}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{new Date(ticket.date).toLocaleString()}</Text>
            </View>

            {ticket.commentaire && (
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Commentaire:</Text>
                    <Text style={styles.value}>{ticket.commentaire}</Text>
                </View>
            )}

            {canEdit && (
                <View style={styles.editSection}>
                    {isAdmin && (
                        <TextInput
                            style={styles.input}
                            placeholder="Ajouter un commentaire"
                            value={comment}
                            onChangeText={setComment}
                            multiline
                        />
                    )}
                    {isOwner && !isEditing && (
                        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                            <Text style={styles.buttonText}>Modifier le ticket</Text>
                        </TouchableOpacity>
                    )}
                    {(isAdmin || (isOwner && isEditing)) && (
                        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>
                                {isAdmin ? 'Valider le ticket' : 'Enregistrer les modifications'}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {isOwner && (
                        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Supprimer le ticket</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F0F0',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100,
    },
    value: {
        flex: 1,
    },
    status: {
        fontWeight: 'bold',
    },
    editSection: {
        marginTop: 20,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        minHeight: 100,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        minHeight: 100,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
    },
});

export default TicketDetails;