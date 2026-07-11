import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Assets() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [assets, setAssets] = useState([]);

  const loadAssets = async () => {
    const snapshot = await getDocs(collection(db, "assets"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAssets(data);
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const addAsset = async (e) => {
    e.preventDefault();

    if (!name || !category || !location) {
      alert("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "assets"), {
      name,
      category,
      location,
      status: "Working",
      createdAt: serverTimestamp(),
    });

    setName("");
    setCategory("");
    setLocation("");

    loadAssets();
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="text-primary mb-4">
          🛠 Asset Management
        </h2>

        <div className="card shadow p-4">

          <form onSubmit={addAsset}>

            <input
              className="form-control mb-3"
              placeholder="Asset Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <button className="btn btn-primary w-100">
              Add Asset
            </button>

          </form>

        </div>

        <input
          className="form-control mt-4"
          placeholder="🔍 Search Asset..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="row mt-4">

          {assets
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (

              <div className="col-md-4 mb-4" key={item.id}>

                <div className="card shadow h-100">

                  <div className="card-body">

                    <h4>{item.name}</h4>

                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>

                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>

                    <p className="text-muted">
                      Created:
                      {" "}
                      {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleString()
                        : "N/A"}
                    </p>

                    <span
                      className={`badge ${
                        item.status === "Working"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>

                    <div className="mt-3">

                      <Link
                        to={`/asset/${item.id}`}
                        className="btn btn-primary w-100"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            ))}

        </div>

      </div>
    </>
  );
}