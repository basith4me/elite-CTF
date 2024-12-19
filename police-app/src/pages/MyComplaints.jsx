import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintPdf from "../components/ComplaintPdf";
import { IoClose } from "react-icons/io5";
import { PDFViewer } from "@react-pdf/renderer";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]); // State to hold complaint data
  const [selectedComplaint, setSelectedComplaint] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  // const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints?_limit=5"
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

  const handleDownloadPdf = (complaint) => {
    setSelectedComplaint(complaint);
    setShowPdf(true);
  };

  return (
    <>
      {showPdf && selectedComplaint && (
        <div className="h-[100vh] m-3 ">
          {/* <button onClick={() => setShowPdf(false)} className="bg-white text-red-500 border-2 border-red-500 ">close</button> */}
          <IoClose onClick={() => setShowPdf(false)} className="bg-slate-300 rounded-full text-4xl texl-bold text-red-600 cursor-pointer "/>
          <PDFViewer width={"100%"} height={"100%"}>
            <ComplaintPdf complaints={selectedComplaint} />
          </PDFViewer>
        </div>
      )}

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="text-center">
          <h1 className="font-extrabold text-4xl text-gray-800 mb-6">
            My Complaints
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-20">
          {complaints.map((complaint) => (
            <div
              key={complaint.c_id}
              className="bg-white p-6 rounded-lg shadow-lg space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-700">
                Complaint About: <span className="font-normal">Lost NIC</span>
              </h2>

              {/* Personal Details */}
              <div>
                <h2 className="text-lg font-bold text-gray-700">Complaint ID</h2>
                <p className="text-gray-600">{complaint.c_id}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">Complaint Type</h2>
                <p className="text-gray-600">{complaint.complaint_type}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">Full Name:</h2>
                <p className="text-gray-600">{complaint.full_name}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">NIC Number:</h2>
                <p className="text-gray-600">{complaint.nic}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  Address Line 1:
                </h2>
                <p className="text-gray-600">{complaint.address_1}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  Address Line 2:
                </h2>
                <p className="text-gray-600">{complaint.address_2}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">City:</h2>
                <p className="text-gray-600">{complaint.city}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">District:</h2>
                <p className="text-gray-600">{complaint.district}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">Province</h2>
                <p className="text-gray-600">{complaint.province}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">Postal Code</h2>
                <p className="text-gray-600">{complaint.postal_code}</p>
              </div>

              {/* Lost Details */}
              <h2 className="text-xl font-bold text-gray-700 mt-6">
                Lost Details:
              </h2>
              <div>
                <h2 className="text-lg font-bold text-gray-700">Lost Date:</h2>
                <p className="text-gray-600">{complaint.lost_date}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">Lost Time:</h2>
                <p className="text-gray-600">{complaint.lost_time}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  Lost Location:
                </h2>
                <p className="text-gray-600">{complaint.lost_location}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  Last Known Date:
                </h2>
                <p className="text-gray-600">{complaint.last_known_date}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  Last Known Time:
                </h2>
                <p className="text-gray-600">{complaint.last_known_time}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  Last Known Location:
                </h2>
                <p className="text-gray-600">{complaint.last_known_location}</p>
              </div>

              {/* Download PDF */}
              <div className="text-right">
                <p
                  className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                  onClick={() => handleDownloadPdf(complaint)}
                >
                  Download PDF
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyComplaints;
