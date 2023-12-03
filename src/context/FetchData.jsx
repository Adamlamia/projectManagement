// firebaseUtils.js
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';

export const fetchData = async (db, collectionName, documentId = null) => {
  try {
    if (documentId) {
      const docRef = doc(db, collectionName, documentId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
    } else {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
