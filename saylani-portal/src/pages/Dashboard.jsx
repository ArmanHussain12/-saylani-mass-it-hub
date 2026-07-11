 import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Dashboard() {
  const [assets, setAssets] = useState(0);
  const [openIssues, setOpenIssues] = useState(0);
  const [completedIssues, setCompletedIssues] = useState(0);

  const loadData = async () => {
    try {
      // Assets
      const assetSnap = await getDocs(collection(db, "assets"));
      setAssets(assetSnap.size);

      // Issues
      const issueSnap = await getDocs(collection(db, "issues"));

      let open = 0;
      let completed = 0;

      issueSnap.forEach((doc) => {
        const data = doc.data();

        if (data.status === "Completed") {
          completed++;
        } else {
          open++;
        }
      });

      setOpenIssues(open);
      setCompletedIssues(completed);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard data.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">
            🛠 MaintainIQ Dashboard
          </h1>

          <p className="text-muted fs-5">
            Smart Maintenance Management Platform
          </p>
        </div>

        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-outline-primary"
            onClick={loadData}
          >
            🔄 Refresh Data
          </button>
        </div>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4 border-primary">
              <h1 className="text-primary fw-bold">{assets}</h1>
              <h5>📦 Total Assets</h5>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4 border-danger">
              <h1 className="text-danger fw-bold">{openIssues}</h1>
              <h5>🔴 Open Issues</h5>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4 border-success">
              <h1 className="text-success fw-bold">{completedIssues}</h1>
              <h5>✅ Completed Issues</h5>
            </div>
          </div>

        </div>

        <div className="card shadow p-4 mt-4">

          <h4 className="fw-bold mb-3">
            Quick Actions
          </h4>

          <div className="row">

            <div className="col-md-4 mb-3">
              <Link
                to="/assets"
                className="btn btn-primary w-100 p-3"
              >
                📦 Manage Assets
              </Link>
            </div>

            <div className="col-md-4 mb-3">
              <Link
                to="/complaints"
                className="btn btn-warning w-100 p-3"
              >
                🔧 Manage Issues
              </Link>
            </div>

            <div className="col-md-4 mb-3">
              <Link
                to="/maintenance"
                className="btn btn-success w-100 p-3"
              >
                📋 Maintenance History
              </Link>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}