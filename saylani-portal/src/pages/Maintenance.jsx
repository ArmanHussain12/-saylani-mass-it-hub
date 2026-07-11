import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase";


export default function Maintenance() {

  const [technician, setTechnician] = useState("");
  const [service, setService] = useState("");
  const [history, setHistory] = useState([]);


  const loadHistory = async () => {

    const snap = await getDocs(
      collection(db, "maintenance_history")
    );


    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setHistory(data);

  };


  useEffect(() => {
    loadHistory();
  }, []);



  const addHistory = async (e) => {

    e.preventDefault();


    if (!technician || !service) {
      alert("Please fill all fields");
      return;
    }


    await addDoc(
      collection(db, "maintenance_history"),
      {
        technician,
        service,
        createdAt: serverTimestamp()
      }
    );


    setTechnician("");
    setService("");

    loadHistory();

  };



  return (

    <>

      <Navbar />


      <div className="container mt-5">


        <h2 className="text-primary">
          📋 Maintenance History
        </h2>



        <div className="card shadow p-4 mt-4">


          <form onSubmit={addHistory}>


            <input

              className="form-control mb-3"

              placeholder="Technician Name"

              value={technician}

              onChange={(e)=>setTechnician(e.target.value)}

            />



            <textarea

              className="form-control mb-3"

              rows="4"

              placeholder="Service Details"

              value={service}

              onChange={(e)=>setService(e.target.value)}

            />



            <button className="btn btn-primary">

              Add Service Record

            </button>


          </form>


        </div>




        <h3 className="mt-5">
          Service Records
        </h3>



        {

          history.map((item)=>(


            <div
              className="card shadow p-3 mt-3"
              key={item.id}
            >


              <h5>
                👨‍🔧 Technician: {item.technician}
              </h5>


              <p>
                🔧 Service: {item.service}
              </p>



              <small className="text-muted">

                {
                  item.createdAt?.toDate
                  ?
                  item.createdAt.toDate().toLocaleString()
                  :
                  "N/A"
                }

              </small>


            </div>


          ))

        }


      </div>


    </>

  );

}