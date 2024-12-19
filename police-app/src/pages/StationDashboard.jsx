// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const StationDashboard = () => {

//   const [station, setStation] = useState([]);
//   const [selectedStation, setSelectedStation] = useState(null);
//   const [complaints, setComplaints] = useState([]);

//   //fetch stations
//   useEffect(() => {
//     const fetchStations = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/complaints/stations"
//         );
//         setStation(response.data);
//       } catch (error) {
//         console.error("Error fetching stations:", error);
//       }
//     };
//     fetchStations();
//   }, []);

//   const handleClickStation = async (station, c_id) => {
//     setSelectedStation(station);
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/complaints/by_station?station=${station}`
//       );
//       setComplaints(response.data);
//       setActiveButton(c_id);
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//     }
//   };
//   // styles
//   const th = "border-2 border-gray-300 px-4 py-2 text-left w-auto";
//   const td = "border-2 border-gray-300 px-4 py- w-auto";
//   return (
//     <div>
//       <div className="justify-center items-center flex mt-4">
//         <h1 className="text-3xl font-bold underline">Stations</h1>
//       </div>
//       <div className="grid grid-cols-5 p-5 space-x-4 justify-center items-center m-3">
//         {station.map((item, index) => (
//           <div
//             key={index}
//             className={`bg-indigo-500 text-center p-3 font-bold rounded-md m-2 cursor-pointer`}
//             onClick={() => handleClickStation(item.station)}
//           >
//             {item.station}
//           </div>
//         ))}
//       </div>

//       {complaints.length > 0 ? (
//         <table className="table-auto border-separate border-spacing-2 border-2 border-gray-300 bg-white w-full">
//           <thead>
//             <tr>
//               <th className={th}>Complaint ID</th>
//               <th className={th}>NIC</th>
//               <th className={th}>Complaint type</th>
//               <th className={th}>Complaint Date</th>
//               <th className={th}>Address Line 1</th>
//               <th className={th}>Address Line 2</th>
//               <th className={th}>Town</th>
//               <th className={th}>District</th>
//               <th className={th}>Province</th>
//             </tr>
//           </thead>
//           <tbody>
//             {complaints.map((complaint) => (
//               <tr key={complaint.c_id}>
//                 <td className={td}>{complaint.c_id}</td>
//                 <td className={td}>{complaint.nic}</td>
//                 <td className={td}>lost NIC</td>

//                 <td className={td}>{complaint.complaint_date}</td>
//                 <td className={td}>{complaint.address_1}</td>
//                 <td className={td}>{complaint.address_2}</td>
//                 <td className={td}>{complaint.city}</td>
//                 <td className={td}>{complaint.district}</td>
//                 <td className={td}>{complaint.province}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default StationDashboard;

import axios from "axios";
import React, { useEffect, useState } from "react";

const StationDashboard = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [activeStation, setActiveStation] = useState(null); // Track active station

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

  const handleClickStation = async (station) => {
    setSelectedStation(station);
    setActiveStation(station); // Highlight the active station
    try {
      const response = await axios.get(
        `http://localhost:5000/api/complaints/by_station?station=${station}`
      );
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
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
              ].map((header, idx) => (
                <th key={idx} className={tableStyles.th}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.c_id}>
                {[
                  complaint.c_id,
                  complaint.nic,
                  "Lost NIC",
                  complaint.complaint_date,
                  complaint.address_1,
                  complaint.address_2,
                  complaint.city,
                  complaint.district,
                  complaint.province,
                ].map((data, idx) => (
                  <td key={idx} className={tableStyles.td}>
                    {data}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-5 text-gray-500">No records found.</p>
      )}
    </div>
  );
};

export default StationDashboard;
