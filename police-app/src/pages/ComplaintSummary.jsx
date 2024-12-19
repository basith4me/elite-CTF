import React, { useState, useEffect } from "react";
import axios from "axios";

const ComplaintSummary = () => {
  const style = "border border-blue-500 p-2 w-1/2";
  const [compalints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [showFilterd, setShowFilterd] = useState(true);
  //drodown data.
  const districts = ["Colombo", "kandy", "Galle", "Ampara"];
  const provinces = ["North western", "Western", "Eastern", "central"];
  const stations = [
    "Dehiwala",
    "pettah",
    "maradana",
    "Nikaweratiya",
    "panadura",
    "wellawatta",
  ];
  //states of filters
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [station, setStation] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints"
        );
        if (response.status === 200) {
          setComplaints(response.data);
        }
      } catch (error) {
        console.error("Error fetching complaints: ", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleSubmit = () => {
    const filtered = compalints.filter((complaint) => {
      return (
        (!province || complaint.province === province) &&
        (!district || complaint.district === district) &&
        (!station || complaint.station === station)
      );
    });
    setFilteredComplaints(filtered);

    setShowFilterd(false);
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-center mt-1 text-3xl font-bold">
          Complaints Summary
        </h1>
        <div className="mt-4 p-3 space-x-3 flex flex-row items-center justify-center ">
          <select
            className={style}
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option>Select a province</option>
            {provinces.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select
            className={style}
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option>select a District</option>
            {districts.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select className={style}>
            <option>Division</option>
            {}
          </select>
          <select
            className={style}
            value={station}
            onChange={(e) => setStation(e.target.value)}
          >
            <option>Select a Station</option>
            {stations.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <button
            className="bg-blue-500 p-3 w-[100px] text-white text-xl rounded-md"
            onClick={handleSubmit}
          >
            Load
          </button>
        </div>
        <div className="flex p-2 w-full">
          <table className="table-auto border-separate border-spacing-2 border-2 border-gray-300 bg-white w-full">
            <thead>
              <tr>
                <th className="border-2 border-gray-300 px-4 py-2 text-left">
                  Complaint ID
                </th>
                <th className="border-2 border-gray-300 px-4 py-2 text-left">
                  Complaint Date
                </th>
                <th className="border-2 border-gray-300 px-4 py-2 text-left">
                  Complaint Type
                </th>
                <th className="border-2 border-gray-300 px-4 py-2 text-left">
                  NIC
                </th>
                <th className="border-2 border-gray-300 px-4 py-2 text-left">
                  Lost Reported By
                </th>
                <th className="border-2 border-gray-300 px-4 py-2 text-left">
                  Province
                </th>
                <th className="border-2 border-gray-300 px-4 py-2 text-left">
                  District
                </th>
                <th className="border-2 border-gray-300 px-4 py-2 text-left">
                  Station
                </th>
              </tr>
            </thead>
            <tbody>
              {showFilterd ? (
                <>
                  {compalints.map((row, index) => (
                    <tr key={index}>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.c_id}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.complaint_date}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.complaint_type}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.nic}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.full_name}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.province}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.district}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.station}
                      </td>
                    </tr>
                  ))}
                </>
              ) : filteredComplaints.length > 0 ? (
                <>
                  {filteredComplaints.map((row, index) => (
                    <tr key={index}>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.c_id}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.complaint_date}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.complaint_type}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.nic}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.full_name}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.province}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.district}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-2">
                        {row.station}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <p>no records found</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ComplaintSummary;
