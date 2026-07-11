import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getDashboardStats = async () => {

  const lost = await getCountFromServer(
    collection(db, "lost_found_items")
  );

  const complaints = await getCountFromServer(
    collection(db, "complaints")
  );

  const volunteers = await getCountFromServer(
    collection(db, "volunteers")
  );

  return {
    lost: lost.data().count,
    complaints: complaints.data().count,
    volunteers: volunteers.data().count,
  };
};