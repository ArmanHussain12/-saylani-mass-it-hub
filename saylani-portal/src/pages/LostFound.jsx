import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  addLostItem,
  getLostItems,
  deleteLostItem,
  updateItemStatus,
} from "../services/firestoreService";

export default function LostFound() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await getLostItems();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    await addLostItem({
      title,
      description,
    });

    setTitle("");
    setDescription("");

    loadItems();
  };

  const filtered = items.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="text-success mb-4">
          Lost & Found
        </h2>

        <div className="card shadow p-4 mb-4">

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              placeholder="Item Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="btn btn-success">
              Add Item
            </button>

          </form>

        </div>

        <input
          className="form-control mb-4"
          placeholder="Search Item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="row">

          {filtered.map((item) => (

            <div className="col-md-6 mb-4" key={item.id}>

              <div className="card shadow">

                <div className="card-body">

                  <h4>{item.title}</h4>

                  <p>{item.description}</p>

                  <span className="badge bg-warning text-dark">
                    {item.status}
                  </span>

                  <div className="mt-3">

                    <button
                      className="btn btn-primary me-2"
                      onClick={async () => {
                        await updateItemStatus(item.id, "Found");
                        loadItems();
                      }}
                    >
                      Mark Found
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={async () => {
                        await deleteLostItem(item.id);
                        loadItems();
                      }}
                    >
                      Delete
                    </button>

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