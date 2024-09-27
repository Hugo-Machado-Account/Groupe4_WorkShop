import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getCurrentUser } from '../../config/firebaseConfig'; // Assurez-vous que le chemin d'importation est correct

const HomeUser = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserName(`${user.prenom} ${user.nom}`);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Bonjour {userName}</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('CreateForm')}
        >
          <Icon name="ticket-plus" size={30} color="#fff" />
          <Text style={styles.buttonText}>Signaler une anomalie</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('TicketList')}
        >
          <Icon name="ticket-outline" size={30} color="#fff" />
          <Text style={styles.buttonText}>Consulter mes tickets</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#2c3e50',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    width: '90%',
    elevation: 3,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 15,
    fontWeight: '600',
  },
});

export default HomeUser;