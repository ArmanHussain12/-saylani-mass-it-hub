import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase";


const volunteerRef = collection(db,"volunteers");


// Add Volunteer

export const addVolunteer = async(data)=>{

  return await addDoc(volunteerRef,{
    ...data,
    createdAt: serverTimestamp()
  });

};


// Get Volunteers

export const getVolunteers = async()=>{

  const snapshot = await getDocs(volunteerRef);


  return snapshot.docs.map((item)=>({

    id:item.id,
    ...item.data()

  }));

};