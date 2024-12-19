import React, { useState, useEffect } from "react";
import axios from "axios";

const StationAssign = () => {
  //styles
  const style = "border border-blue-500 p-2 w-1/2";
  const th = "border-2 border-gray-300 px-4 py-2 text-left w-auto";
  const td = "border-2 border-gray-300 px-4 py- w-auto";

  const stations = [
    "dehiwala",
    "panadura",
    "wellawatta",
    "pettah",
    "Nikaweratiya",
    "Dematagoda",
  ];
  const [assignStation, setAssignStation] = useState({});

  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints/null_stations"
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

  const handldeAssignStation = async (c_id) => {
    // e.preventDefault();
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
        alert("station assigned successfully");
      }
    } catch (error) {
      console.error("error assigning station", error);
      alert("failed to assign station");
    }
  };

  return (
    <div>
      <div className="mt-4 p-3 space-x-3 flex flex-row items-center justify-center ">
        <select className={style}>
          <option>Province</option>
        </select>
        <select className={style}>
          <option>District</option>
        </select>
        <select className={style}>
          <option>Division</option>
        </select>
        <select className={style}>
          <option>Station</option>
        </select>
        <button className="bg-blue-500 p-3 w-[100px] text-white text-xl rounded-md">
          Load
        </button>
      </div>
      <div className="flex p-2 w-full">
        <table className="table-auto border-separate border-spacing-2 border-2 border-gray-300 bg-white w-full">
          <thead>
            <tr>
              <th className={th}>Complaint ID</th>
              <th className={th}>NIC</th>
              <th className={th}>complaint type</th>
              <th className={th}>Complaint Date</th>
              <th className={th}>Address Line 1</th>
              <th className={th}>Address Line 2</th>
              <th className={th}>Town</th>
              <th className={th}>District</th>
              <th className={th}>Province</th>
              <th className={th}>Station</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((row, index) => (
              <tr key={index}>
                <td className={td}>{row.c_id}</td>
                <td className={td}>{row.nic}</td>
                <td className={td}>{/* {row.complaint_type} */} Lost NIC</td>
                <td className={td}>{row.complaint_date}</td>

                <td className={td}>{row.address_1}</td>
                <td className="border-2 border-gray-300 px-4 py-  w-auto">
                  {row.address_2}
                </td>

                <td className={td}>{row.city}</td>
                <td className={td}>{row.district}</td>
                <td className={td}>{row.province}</td>
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
                    <option value="">select a station</option>
                    {stations.map((item, index) => (
                      <option key={index}>{item}</option>
                    ))}
                  </select>
                </td>
                <td className="bord border-gray-300 px-4 py-">
                  <button
                    className="text-white bg-green-600 p-2 rounded-md"
                    onClick={() => handldeAssignStation(row.c_id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationAssign;
