import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getDatabase, ref, set, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/firebaseConfig'; // Assurez-vous que le chemin est correct

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fonction pour encoder l'email de manière sûre pour Firebase
const encodeEmail = (email) => {
    return email.replace(/\./g, '_dot_').replace(/@/g, '_at_');
};

// Fonction pour obtenir le dernier ID utilisateur
const getLastUserId = async () => {
    const usersRef = ref(database, 'Utilisateur');
    const snapshot = await get(usersRef);
    let lastId = 0;
    snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        if (userData.id_utilisateur && userData.id_utilisateur > lastId) {
            lastId = userData.id_utilisateur;
        }
    });
    return lastId;
};

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');

    const handleRegister = async () => {
        if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || nom.trim() === '' || prenom.trim() === '') {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        
        try {
            const encodedEmail = encodeEmail(email);
            const userRef = ref(database, `Utilisateur/${encodedEmail}`);
            
            // Vérifier si l'email existe déjà
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
                Alert.alert('Error', 'This email is already registered');
                return;
            }

            // Obtenir le dernier ID et l'incrémenter
            const lastId = await getLastUserId();
            const newId = lastId + 1;

            // Enregistrer le nouvel utilisateur
            await set(userRef, {
                id_utilisateur: newId,
                mail: email,
                mdp: password,
                nom: nom,
                prenom: prenom,
                type: 'utilisateur'
            });
            
            console.log('User registered:', { id: newId, email, nom, prenom });
            Alert.alert('Success', 'Registration successful!', [
                { text: 'OK', onPress: () => navigation.navigate('Login') }
            ]);
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Registration failed. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Register</Text>

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

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                value={nom}
                onChangeText={setNom}
            />

            <Text style={styles.label}>Prénom</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                value={prenom}
                onChangeText={setPrenom}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    buttonContainer: {
        marginVertical: 10,
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
    linkText: {
        color: '#007AFF',
        fontSize: 16,
        textAlign: 'center',
    },
});