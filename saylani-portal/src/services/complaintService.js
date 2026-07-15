 import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// Firestore Collection
const issueRef = collection(db, "issues");

// Add New Issue
export const addComplaint = async (data) => {
  return await addDoc(issueRef, {
    category: data.category,
    description: data.description,
    technician: data.technician || "",
    status: data.technician ? "Assigned" : "Open",
    createdAt: serverTimestamp(),
  });
};

// Get All Issues
export const getComplaints = async () => {
  const snapshot = await getDocs(issueRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Update Status (Open / Assigned / Completed)
export const updateComplaintStatus = async (id, status) => {
  return await updateDoc(doc(db, "issues", id), {
    status,
  });
};

// Update Technician
export const assignTechnician = async (id, technician) => {
  return await updateDoc(doc(db, "issues", id), {
    technician,
    status: "Assigned",
  });
};vi