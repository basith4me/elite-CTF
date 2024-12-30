import axios from "axios";
import React, { useEffect, useState } from "react";

const StationDashboard = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [activeStation, setActiveStation] = useState(null); // Track active station
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showRecords, setShowRecords] = useState(true);

  // Fetch stations
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints/stations"
        );
        setStations(response.data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };
    fetchStations();
  }, []);

  // Fetch complaints for a specific station
  const handleClickStation = async (station) => {
    setSelectedStation(station);
    setActiveStation(station); // Highlight the active station
    setStartDate(""); // Clear filters
    setEndDate("");
    setFilteredComplaints([]); // Clear filtered complaints
    setShowRecords(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/complaints/by_station?station=${station}`
      );
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // Filter complaints by date
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = complaints.filter((complaint) => {
        const complaintDate = new Date(complaint.complaint_date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return complaintDate >= start && complaintDate <= end;
      });
      setFilteredComplaints(filtered);
      setShowRecords(false);
    } else {
      setFilteredComplaints([]); // Reset filtered complaints
      setShowRecords(true);
    }
  };

  // Styles
  const tableStyles = {
    th: "border-2 border-gray-300 px-4 py-2 text-left w-auto",
    td: "border-2 border-gray-300 px-4 py-2 w-auto",
    activeButton: "bg-indigo-700 text-white",
    defaultButton: "bg-indigo-500 text-white",
  };

  return (
    <div>
      <div className="justify-center items-center flex mt-4">
        <h1 className="text-3xl font-bold underline">Stations</h1>
      </div>

      {/* Station Buttons */}
      <div className="grid grid-cols-5 p-5 space-x-4 justify-center items-center m-3">
        {stations.map((item, index) => (
          <div
            key={index}
            className={`text-center p-3 font-bold rounded-md m-2 cursor-pointer ${
              activeStation === item.station
                ? tableStyles.activeButton
                : tableStyles.defaultButton
            }`}
            onClick={() => handleClickStation(item.station)}
          >
            {item.station}
          </div>
        ))}
      </div>

      {/* Complaints Table */}
      {complaints.length > 0 ? (
        <div className="p-2 py-3">
          <h1 className="font-bold text-start">Filter by Date</h1>
          <div className="space-x-5 p-2">
            <label htmlFor="">Start Date</label>
            <input
              type="date"
              className="p-2 border border-blue-400"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="">End Date</label>
            <input
              type="date"
              className="p-2 border border-blue-400"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              className="bg-blue-600 p-2 rounded-md text-white font-bold"
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
          <table className="table-auto border-separate border-spacing-2 border-2 border-gray-300 bg-white w-full">
            <thead>
              <tr>
                {[
                  "Complaint ID",
                  "NIC",
                  "Complaint Type",
                  "Complaint Date",
                  "Address Line 1",
                  "Address Line 2",
                  "Town",
                  "District",
                  "Province",
                  "Division",
                  "Postal Code",
                ].map((header, idx) => (
                  <th key={idx} className={tableStyles.th}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {showRecords &&
                complaints.map((complaint) => (
                  <tr key={complaint.c_id}>
                    {[
                      complaint.c_id,
                      complaint.nic,
                      complaint.complaint_type,
                      complaint.complaint_date,
                      complaint.address_1,
                      complaint.address_2,
                      complaint.city,
                      complaint.district,
                      complaint.province,
                      complaint.division,
                      complaint.postal_code,
                    ].map((data, idx) => (
                      <td key={idx} className={tableStyles.td}>
                        {data}
                      </td>
                    ))}
                  </tr>
                ))}
              {!showRecords &&
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.c_id}>
                    {[
                      complaint.c_id,
                      complaint.nic,
                      complaint.complaint_type,
                      complaint.complaint_date,
                      complaint.address_1,
                      complaint.address_2,
                      complaint.city,
                      complaint.district,
                      complaint.province,
                      complaint.division,
                      complaint.postal_code,
                    ].map((data, idx) => (
                      <td key={idx} className={tableStyles.td}>
                        {data}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-5 text-gray-500">No records found.</p>
      )}
    </div>
  );
};

export default StationDashboard;
