import { initializeApp } from 'firebase/app';
import { 
  getDatabase, 
  ref, 
  push, 
  get, 
  set, 
  remove, 
  query, 
  orderByChild, 
  equalTo,
  serverTimestamp
} from 'firebase/database';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const iosConfig = {
  apiKey: "AIzaSyDYcHUqoUECK8yKSh4fn5r6E53dx9tA_Nc",
  databaseURL: "https://bddjesignale-default-rtdb.firebaseio.com",
  projectId: "bddjesignale",
  appId: "1:387162508386:ios:3955ab14bf3df266e5953b",
};

const androidConfig = {
  apiKey: "AIzaSyBYr9XvDDUpAxYd8kMWCLspqLL6y6kiVBI",
  databaseURL: "https://bddjesignale-default-rtdb.firebaseio.com",
  projectId: "bddjesignale",
  appId: "1:88804593875:android:2802441db3c2bd3e6e4426",
};

export const firebaseConfig = Platform.OS === 'ios' ? iosConfig : androidConfig;

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const authenticateUser = async (userData) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    console.log('User authenticated and data stored');
  } catch (e) {
    console.error('Error storing user data:', e);
    throw e;
  }
};

export const getCurrentUser = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error('Error getting current user:', e);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
    console.log('User logged out');
  } catch (e) {
    console.error('Error logging out user:', e);
    throw e;
  }
};

export const addTicket = async (ticketData) => {
  console.log("Début de addTicket avec les données:", ticketData);
  try {
    const lastId = await getLastTicketId();
    const newId = lastId + 1;
    
    const cleanTitle = ticketData.titre.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const newTicketKey = `${cleanTitle}_${newId}`;
    
    console.log("Tentative d'ajout à la Realtime Database...");
    const ticketRef = ref(db, `Ticket/${newTicketKey}`);
    await set(ticketRef, {
      ...ticketData,
      id_ticket: newId
    });
    
    console.log("Ticket ajouté avec succès. Clé:", newTicketKey);
    return newTicketKey;
  } catch (e) {
    console.error("Erreur détaillée lors de l'ajout du ticket:", e);
    throw e;
  }
};

export const getLastTicketId = async () => {
  try {
    const ticketsRef = ref(db, 'Ticket');
    const snapshot = await get(ticketsRef);
    let lastId = 0;
    snapshot.forEach((childSnapshot) => {
      const ticketData = childSnapshot.val();
      if (ticketData.id_ticket > lastId) {
        lastId = ticketData.id_ticket;
      }
    });
    return lastId;
  } catch (e) {
    console.error("Erreur lors de la récupération du dernier ID de ticket:", e);
    throw e;
  }
};

export const getTicket = async (ticketId) => {
  try {
    const ticketRef = ref(db, `Ticket/${ticketId}`);
    const snapshot = await get(ticketRef);
    if (snapshot.exists()) {
      return { id: ticketId, ...snapshot.val() };
    } else {
      console.log("Aucun ticket trouvé avec cet ID");
      return null;
    }
  } catch (e) {
    console.error("Erreur lors de la récupération du ticket: ", e);
    throw e;
  }
};

export const getAllTickets = async () => {
  try {
    const ticketsRef = ref(db, 'Ticket');
    const snapshot = await get(ticketsRef);
    if (snapshot.exists()) {
      const tickets = [];
      snapshot.forEach((childSnapshot) => {
        tickets.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return tickets;
    } else {
      return [];
    }
  } catch (e) {
    console.error("Erreur lors de la récupération des tickets: ", e);
    throw e;
  }
};

export const updateTicket = async (ticketId, updateData) => {
  try {
    const ticketRef = ref(db, `Ticket/${ticketId}`);
    await set(ticketRef, updateData);
    console.log("Ticket mis à jour avec succès");
  } catch (e) {
    console.error("Erreur lors de la mise à jour du ticket: ", e);
    throw e;
  }
};

export const deleteTicket = async (ticketId) => {
  try {
    const ticketRef = ref(db, `Ticket/${ticketId}`);
    await remove(ticketRef);
    console.log("Ticket supprimé avec succès");
  } catch (e) {
    console.error("Erreur lors de la suppression du ticket: ", e);
    throw e;
  }
};

export const getTicketsByCategory = async (category) => {
  try {
    const ticketsRef = ref(db, 'Ticket');
    const ticketQuery = query(ticketsRef, orderByChild('categorie'), equalTo(category));
    const snapshot = await get(ticketQuery);
    if (snapshot.exists()) {
      const tickets = [];
      snapshot.forEach((childSnapshot) => {
        tickets.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return tickets;
    } else {
      return [];
    }
  } catch (e) {
    console.error("Erreur lors de la récupération des tickets par catégorie: ", e);
    throw e;
  }
};