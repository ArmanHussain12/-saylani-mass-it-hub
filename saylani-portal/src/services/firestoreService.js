import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const lostCollection = collection(db, "lost_found_items");

// Add Item
export const addLostItem = async (item) => {
  return await addDoc(lostCollection, {
    ...item,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
};

// Get Items
export const getLostItems = async () => {
  const snapshot = await getDocs(lostCollection);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// Delete
export const deleteLostItem = async (id) => {
  return await deleteDoc(doc(db, "lost_found_items", id));
};

// Update Status
export const updateItemStatus = async (id, status) => {
  return await updateDoc(doc(db, "lost_found_items", id), {
    status,
  });
};