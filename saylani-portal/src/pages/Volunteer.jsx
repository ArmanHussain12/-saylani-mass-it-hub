import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  addVolunteer,
  getVolunteers
} from "../services/volunteerService";


export default function Volunteer() {

  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [availability, setAvailability] = useState("");

  const [volunteers, setVolunteers] = useState([]);



  const loadVolunteers = async()=>{

    const data = await getVolunteers();

    setVolunteers(data);

  };



  useEffect(()=>{

    loadVolunteers();

  },[]);




  const submitHandler = async(e)=>{

    e.preventDefault();


    if(!name || !event || !availability){

      alert("Please fill all fields");
      return;

    }


    await addVolunteer({

      name,
      event,
      availability

    });



    setName("");
    setEvent("");
    setAvailability("");


    loadVolunteers();

  };



  return (

    <>

    <Navbar />


    <div className="container mt-5">


      <h2 className="text-success">
        Volunteer Registration
      </h2>



      <div className="card shadow p-4 mt-3">


        <form onSubmit={submitHandler}>


          <input

            className="form-control mb-3"

            placeholder="Your Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

          />



          <input

            className="form-control mb-3"

            placeholder="Event Name"

            value={event}

            onChange={(e)=>setEvent(e.target.value)}

          />



          <input

            className="form-control mb-3"

            placeholder="Availability (e.g. Weekend)"

            value={availability}

            onChange={(e)=>setAvailability(e.target.value)}

          />



          <button className="btn btn-success">

            Register

          </button>



        </form>


      </div>




      <h3 className="mt-5">
        Volunteer List
      </h3>



      <div className="row mt-3">


      {
        volunteers.map((volunteer)=>(


          <div 
          className="col-md-6 mb-3"
          key={volunteer.id}
          >


            <div className="card shadow p-3">


              <h5>
                {volunteer.name}
              </h5>


              <p>
                Event: {volunteer.event}
              </p>


              <p>
                Availability: {volunteer.availability}
              </p>



            </div>


          </div>


        ))
      }


      </div>



    </div>


    </>

  );

}