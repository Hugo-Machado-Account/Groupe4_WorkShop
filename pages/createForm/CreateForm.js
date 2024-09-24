import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

const CreateTicketForm = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = () => {

    console.log({ category, title, description });
    navigation.goBack();
  };

  const handleTakePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options)
      .then((result) => {
        if (result.didCancel) {
          console.log('User cancelled image picker');
        } else if (result.errorCode) {
          console.log('ImagePicker Error: ', result.errorMessage);
          Alert.alert('Erreur', 'Impossible de prendre une photo. Veuillez réessayer.');
        } else if (result.assets && result.assets.length > 0) {
          setPhoto({ uri: result.assets[0].uri });
        }
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la prise de photo.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Icon name="account" size={24} color="#000" />
          <Text style={styles.headerText}>Déclarant</Text>
        </View>
        <View style={styles.headerItem}>
          <Icon name="clock-outline" size={24} color="#000" />
          <Text style={styles.headerText}>Date et heure</Text>
        </View>
      </View>

      <View style={styles.headerValues}>
        <Text style={styles.headerValue}>Hugo MACHADO</Text>
        <Text style={styles.headerValue}>{new Date().toLocaleString()}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="alert-circle-outline" size={24} color="#000" />
        <Text style={styles.inputLabel}>Catégorie</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Informatique" value="Informatique" />
            <Picker.Item label="Générale" value="generale" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="pencil" size={24} color="#000" />
        <Text style={styles.inputLabel}>Nom du Ticket</Text>
        <TextInput
          style={styles.input}
          placeholder="Saisir l'intitulé de votre déclaration.."
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="text" size={24} color="#000" />
        <Text style={styles.inputLabel}>Description d'un incident</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Décrire en quelques mots..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
        <Icon name="camera" size={24} color="#fff" />
        <Text style={styles.photoButtonText}>Clique ici pour saisir la photo</Text>
      </TouchableOpacity>

      {photo && (
        <Image source={photo} style={styles.photoPreview} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Soumettre</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 50,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerValue: {
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 20,
  },
  photoButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  photoPreview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default CreateTicketForm;