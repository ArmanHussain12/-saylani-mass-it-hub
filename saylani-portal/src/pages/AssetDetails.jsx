import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";

export default function AssetDetails() {

  const { id } = useParams();

  const [asset, setAsset] = useState(null);


  useEffect(() => {

    const loadAsset = async () => {

      const snap = await getDoc(
        doc(db, "assets", id)
      );


      if (snap.exists()) {
        setAsset(snap.data());
      }

    };


    loadAsset();

  }, [id]);



  if (!asset) {

    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <h3>Loading Asset...</h3>
        </div>
      </>
    );

  }



  return (

    <>

      <Navbar />


      <div className="container mt-5">


        <div className="card shadow p-4">


          <h2 className="text-primary">
            {asset.name}
          </h2>


          <hr />


          <p>
            <strong>Category:</strong> {asset.category}
          </p>


          <p>
            <strong>Location:</strong> {asset.location}
          </p>


          <p>
            <strong>Status:</strong>

            {" "}

            <span className="badge bg-success">
              {asset.status}
            </span>

          </p>


          <p>
            <strong>Created:</strong>

            {" "}

            {
              asset.createdAt?.toDate
              ?
              asset.createdAt.toDate().toLocaleString()
              :
              "N/A"
            }

          </p>



          <hr />



          <h4>
            Asset QR Code
          </h4>



          <div className="mt-3">

            <QRCodeCanvas

              value={
                window.location.origin +
                "/asset/" +
                id
              }

              size={180}

            />


          </div>



          <p className="text-muted mt-3">

            Scan this QR code to open asset details.

          </p>



        </div>


      </div>


    </>

  );

}