import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, get, child } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, authenticateUser } from '../../config/firebaseConfig';

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(app));

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // içi, on va chercher l'utilisateur dans la base de données
        try {
            // on récupère les données de la collection Utilisateur
            const snapshot = await get(child(dbRef, 'Utilisateur'));
            // on vérifie si la collection contient des données
            if (snapshot.exists()) {
                let userFound = false;
                // on parcourt les données pour trouver l'utilisateur
                snapshot.forEach((childSnapshot) => {
                    // on récupère les données de l'utilisateur
                    const userData = childSnapshot.val();
                    // on vérifie si l'utilisateur existe
                    if (userData.mail === email && userData.mdp === password) {
                        // si l'utilisateur existe, on l'authentifie
                        userFound = true;
                        authenticateUser(userData)
                            .then(() => {
                                // si l'authentification réussit, on redirige l'utilisateur vers la bonne page (AdminStack ou UserStack)
                                if (userData.type === 'administrateur') {
                                    navigation.replace('AdminStack');
                                } else {
                                    navigation.replace('UserStack');
                                }
                            })
                            .catch((error) => {
                                // si l'authentification échoue, on affiche un message d'erreur
                                console.error('Authentication error:', error);
                                Alert.alert('Error', 'An error occurred during authentication');
                            });
                    }
                });
                // si l'utilisateur n'est pas trouvé, on affiche un message d'erreur
                if (!userFound) {
                    Alert.alert('Login Failed', 'Invalid email or password');
                }
            // si la collection ne contient pas de données, on affiche un message d'erreur
            } else {
                Alert.alert('Error', 'No users found in the database');
            }
        } catch (error) {
            // si une erreur survient, on affiche un message d'erreur
            console.error('Error during login:', error);
            Alert.alert('Error', 'An error occurred during login');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Se connecter</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre mot de passe"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>S'enregistez</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.linkButton} 
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.linkText}>Pas de comptes ? Enregistrez vous !</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#007AFF',
        fontSize: 16,
    },
});