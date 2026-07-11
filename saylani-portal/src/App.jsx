 import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LostFound from "./pages/LostFound";
import Complaints from "./pages/Complaints";
import Volunteer from "./pages/Volunteer";
import Assets from "./pages/Assets";
import AssetDetails from "./pages/AssetDetails";
import Maintenance from "./pages/Maintenance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/asset/:id" element={<AssetDetails />} />
        <Route path="/maintenance" element={<Maintenance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;