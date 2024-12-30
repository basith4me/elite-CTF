import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const StationAssign = () => {
  // Styles
  const style = "border border-blue-500 p-2 w-1/2";
  const th = "border-2 border-gray-300 px-4 py-2 text-left w-auto";
  const td = "border-2 border-gray-300 px-4 py- w-auto";

  const colomboDiv = ["Wellawatta", "Pettah", "Dematagoda"];

  const panaduraDiv = ["Panadura", "Dehiwala"];

  const kurunegalaDiv = ["Nikaweratiya", "Kuliyapitiya"];

  const [assignStation, setAssignStation] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  // Fetch complaints with null stations initially
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints/null_stations"
        );
        if (response.status === 200) {
          setComplaints(response.data);
          setFilteredComplaints(response.data); // Set initial state for filtered complaints
        }
      } catch (error) {
        console.error("Error fetching complaints: ", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleAssignStation = async (c_id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/complaints/assign_station",
        {
          c_id,
          station: assignStation[c_id],
        }
      );

      if (response.status === 200) {
        setComplaints((prevComplaints) =>
          prevComplaints.filter((complaint) => complaint.c_id !== c_id)
        );
        setFilteredComplaints((prevComplaints) =>
          prevComplaints.filter((complaint) => complaint.c_id !== c_id)
        );
        // alert("Station assigned successfully");
        toast.success("Station assigned successfully");
      }
    } catch (error) {
      console.error("Error assigning station", error);
      // alert("Failed to assign station");
      toast.error("Failed to assign station");
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
      setIsFiltered(true);
    } else {
      alert("Please select both start and end dates");
    }
  };

  // Reset filter to show all complaints
  const resetFilter = () => {
    setFilteredComplaints(complaints);
    setStartDate("");
    setEndDate("");
    setIsFiltered(false);
  };

  return (
    <div>
      <div className="flex p-2 w-full flex-col ">
        <h1 className="text-center py-3 text-3xl font-bold">
          Station Assigning
        </h1>

        {/* Filter Section */}
        <div className="flex flex-col justify-center items-center space-x-3 p-2 space-y-3">
          <div>
            <h1 className="font-bold text-xl">Filter by Date</h1>
          </div>
          <div className="space-x-3 flex flex-row items-center justify-center">
            <label htmlFor="">Start Date</label>
            <input
              type="date"
              className="p-2 border border-blue-600"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="">End Date</label>
            <input
              type="date"
              className="p-2 border border-blue-600"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              className="bg-blue-600 p-2 rounded-md font-bold text-white"
              onClick={handleFilter}
            >
              Filter
            </button>
            {isFiltered && (
              <button
                className="bg-gray-600 p-2 rounded-md font-bold text-white"
                onClick={resetFilter}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Complaints Table */}
        <table className="table-auto border-separate border-spacing-2 border-2 border-gray-300 bg-white w-full">
          <thead>
            <tr>
              <th className={th}>Complaint ID</th>
              <th className={th}>NIC</th>
              <th className={th}>Complaint Type</th>
              <th className={th}>Complaint Date</th>
              <th className={th}>Address Line 1</th>
              <th className={th}>Address Line 2</th>
              <th className={th}>Postal Code</th>
              <th className={th}>Town</th>
              <th className={th}>District</th>
              <th className={th}>Province</th>
              <th className={th}>Division</th>
              <th className={th}>Station</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((row, index) => (
              <tr key={index}>
                <td className={td}>{row.c_id}</td>
                <td className={td}>{row.nic}</td>
                <td className={td}> {row.complaint_type} </td>
                <td className={td}>{row.complaint_date}</td>
                <td className={td}>{row.address_1}</td>
                <td className={td}>{row.address_2}</td>
                <td className={td}>{row.postal_code}</td>
                <td className={td}>{row.city}</td>
                <td className={td}>{row.district}</td>
                <td className={td}>{row.province}</td>
                <td className={td}>{row.division}</td>
                <td className={td}>
                  <select
                    id={`station-${row.c_id}`}
                    onChange={(e) =>
                      setAssignStation((prev) => ({
                        ...prev,
                        [row.c_id]: e.target.value,
                      }))
                    }
                    value={assignStation[row.c_id] || ""}
                  >
                    <option value="">Select a station</option>
                    {row.division === "Kurunegala"
                      ? kurunegalaDiv.map((item, index) => (
                          <option key={index}>{item}</option>
                        ))
                      : row.division === "Colombo"
                      ? colomboDiv.map((item, index) => (
                          <option key={index}>{item}</option>
                        ))
                      : row.division === "Panadura"
                      ? panaduraDiv.map((item, index) => (
                          <option key={index}>{item}</option>
                        ))
                      : colomboDiv.map((item, index) => (
                          <option key={index}>{item}</option>
                        ))}
                  </select>
                </td>
                <td className="bord border-gray-300 px-4 py-">
                  <button
                    className="text-white bg-green-600 p-2 rounded-md"
                    onClick={() => handleAssignStation(row.c_id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};

export default StationAssign;
