import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, get, child } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, authenticateUser } from '../../config/firebaseConfig';

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(app));

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const snapshot = await get(child(dbRef, 'Utilisateur'));
            if (snapshot.exists()) {
                let userFound = false;
                snapshot.forEach((childSnapshot) => {
                    const userData = childSnapshot.val();
                    if (userData.mail === email && userData.mdp === password) {
                        userFound = true;
                        authenticateUser(userData)
                            .then(() => {
                                if (userData.type === 'administrateur') {
                                    navigation.replace('AdminStack');
                                } else {
                                    navigation.replace('UserStack');
                                }
                            })
                            .catch((error) => {
                                console.error('Authentication error:', error);
                                Alert.alert('Error', 'An error occurred during authentication');
                            });
                    }
                });
                if (!userFound) {
                    Alert.alert('Login Failed', 'Invalid email or password');
                }
            } else {
                Alert.alert('Error', 'No users found in the database');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An error occurred during login');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.linkButton} 
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.linkText}>Don't have an account? Register</Text>
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