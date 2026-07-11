 import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
} from "../services/complaintService";


export default function Complaints() {

  const [category, setCategory] = useState("Medium");
  const [description, setDescription] = useState("");
  const [technician, setTechnician] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");


  const loadComplaints = async () => {

    const data = await getComplaints();

    setComplaints(data);

  };


  useEffect(() => {

    loadComplaints();

  }, []);



  const submitHandler = async (e) => {

    e.preventDefault();


    if (!description.trim()) {

      alert("Please describe the issue");

      return;

    }


    await addComplaint({

      category,

      description,

      technician,

    });


    setCategory("Medium");
    setDescription("");
    setTechnician("");


    loadComplaints();

  };



  const filteredComplaints = complaints.filter((item)=>{

    const text = (

      (item.category || "") +
      " " +
      (item.description || "") +
      " " +
      (item.technician || "")

    ).toLowerCase();


    return text.includes(search.toLowerCase());

  });



  return (

    <>

      <Navbar />


      <div className="container mt-5">


        <h2 className="text-primary mb-4">
          🛠 MaintainIQ - Issue Management
        </h2>



        {/* Search */}

        <div className="card shadow p-3 mb-4">

          <input

            type="text"

            className="form-control"

            placeholder="🔍 Search by Priority, Description or Technician..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

          />

        </div>




        {/* Add Issue */}

        <div className="card shadow p-4">


          <form onSubmit={submitHandler}>


            <label className="mb-2">
              Issue Priority
            </label>


            <select

              className="form-control mb-3"

              value={category}

              onChange={(e)=>setCategory(e.target.value)}

            >

              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>

            </select>



            <input

              className="form-control mb-3"

              placeholder="👨‍🔧 Technician Name"

              value={technician}

              onChange={(e)=>setTechnician(e.target.value)}

            />



            <textarea

              className="form-control mb-3"

              rows="4"

              placeholder="Describe the maintenance issue..."

              value={description}

              onChange={(e)=>setDescription(e.target.value)}

            />



            <button className="btn btn-primary w-100">

              Report Issue

            </button>


          </form>


        </div>





        <h3 className="mt-5">
          Reported Issues
        </h3>



        <div className="row mt-3">


          {filteredComplaints.map((item)=>(


            <div

              className="col-md-6 mb-4"

              key={item.id}

            >


              <div className="card shadow p-3 h-100">


                <h5>
                  Priority: {item.category}
                </h5>



                <p>
                  {item.description}
                </p>



                <p>

                  👨‍🔧 Technician:

                  <strong>

                    {" "}

                    {item.technician || "Not Assigned"}

                  </strong>

                </p>




                <p className="text-muted">

                  Reported:

                  {" "}

                  {

                    item.createdAt?.toDate

                    ?

                    item.createdAt.toDate().toLocaleString()

                    :

                    "N/A"

                  }


                </p>




                <span

                  className={

                    `badge ${

                      item.status === "Completed"

                      ?

                      "bg-success"

                      :

                      item.status === "Assigned"

                      ?

                      "bg-warning text-dark"

                      :

                      "bg-danger"

                    }`

                  }

                >

                  {item.status}

                </span>





                <div className="mt-3 d-flex gap-2">



                  {

                    item.status === "Open" &&

                    (

                      <button

                        className="btn btn-warning"

                        onClick={()=>{

                          updateComplaintStatus(

                            item.id,

                            "Assigned"

                          )

                          .then(loadComplaints);

                        }}

                      >

                        👨‍🔧 Assign

                      </button>

                    )

                  }






                  {

                    item.status !== "Completed" &&

                    (

                      <button

                        className="btn btn-success"

                        onClick={()=>{

                          updateComplaintStatus(

                            item.id,

                            "Completed"

                          )

                          .then(loadComplaints);

                        }}

                      >

                        ✅ Mark Completed

                      </button>

                    )

                  }



                </div>


              </div>


            </div>


          ))}


        </div>



      </div>


    </>

  );

}