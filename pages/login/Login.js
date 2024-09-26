import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Logique de connexion ici (validation, API, etc.)
        // Pour l'instant, on navigue directement à la page User
        navigation.navigate('User');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* Label Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            {/* Label Password */}
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true} // Cache le mot de passe
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Go to Admin" onPress={() => navigation.navigate('Admin')} />
            </View>
        </View>
    );
}


// Styles CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#d3d3d3', // Couleur de fond gris clair
        justifyContent: 'center', // Centre le contenu verticalement
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
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    buttonContainer: {
        marginVertical: 10, // Espacement vertical entre les boutons
    },
});
