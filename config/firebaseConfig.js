import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Assurez-vous que ce chemin est correct

const getAllData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return [];
  }
};

// Utilisation
const fetchData = async () => {
  const allUsers = await getAllData('users');
  console.log(allUsers);
};

fetchData();