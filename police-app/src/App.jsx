import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import LostNic from "./pages/LostNic";
import MyComplaints from "./pages/MyComplaints";
import ComplaintSummary from "./pages/ComplaintSummary";
import StationAssign from "./pages/StationAssign";
import StationDashboard from "./pages/StationDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report-lost-nic" element={<LostNic />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/complaints-summary" element={<ComplaintSummary />} />
        <Route path="/stations_assigning" element={<StationAssign />} />
        <Route path="/station_dashboard" element={<StationDashboard />} />
      </Routes>
    </>
  );
}

export default App;
