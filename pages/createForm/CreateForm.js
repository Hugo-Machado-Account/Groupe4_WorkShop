import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const CreateForm = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const categories = [
    { label: 'Informatique', value: 'informatique' },
    { label: 'Générale', value: 'generale' }
  ];

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (hasPermission) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Désolé, nous avons besoin de la permission pour sauvegarder la photo.');
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
        await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permission refusée', 'Pas de permission pour accéder à la caméra');
    }
  };

  const handleSubmit = () => {
    console.log({ category, title, description, photo });
    navigation.goBack();
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
        <View style={styles.labelContainer}>
          <Icon name="alert-circle-outline" size={24} color="#000" />
          <Text style={styles.inputLabel}>Catégorie</Text>
        </View>
        <View style={styles.radioContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.value}
              style={styles.radioButton}
              onPress={() => setCategory(cat.value)}
            >
              <View style={styles.radio}>
                {category === cat.value && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Icon name="pencil" size={24} color="#000" />
          <Text style={styles.inputLabel}>Nom du Ticket</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Saisir l'intitulé de votre déclaration.."
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Icon name="text" size={24} color="#000" />
          <Text style={styles.inputLabel}>Description d'un incident</Text>
        </View>
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
        <Image source={{ uri: photo }} style={styles.photoPreview} />
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
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
  radioContainer: {
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  radioLabel: {
    fontSize: 16,
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

export default CreateForm;