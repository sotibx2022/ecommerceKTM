import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
 
} from "firebase/firestore";
import { db} from "./firebaseConfig";
import toast from "react-hot-toast";


export const setDataToFireBase = async (fileName, id, data) => {
  await setDoc(doc(db, fileName, id), data);
  toast.success("Details Posted Successfully..");
};
export const fetchSingleDataFromFireBase = async (fileName, id) => {
  const docRef = doc(db, fileName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    toast.error("No such document!");
    return null;
  }
};
export const updateSingleDataToFireBase = async (fileName, id, updatedData) => {
  const docRef = doc(db, fileName, id);

  try {
    await updateDoc(docRef, updatedData);
    
  } catch (error) {
    toast.error(error.message);
  }
};
export const getAllDataFromFireBase = async (fileName) => {
  const querySnapshot = await getDocs(collection(db, fileName));
  const datasArray = [];
  querySnapshot.forEach((doc) => {
    datasArray.push(doc.data());
  });
  return datasArray;
};
export const deleteDataFromFireBase = async (fileName, id) => {
  await deleteDoc(doc(db, fileName, id));
  toast.success("Data Deleted Successfully");
  getAllDataFromFireBase("Sliders");
};
export const deleteItemsFromFirebase = async(collectionName, deleteCondition) =>{
  console.log("fired")
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, deleteCondition);
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
}
