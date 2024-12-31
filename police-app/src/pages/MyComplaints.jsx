import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintPdf from "../components/ComplaintPdf";
import { IoClose } from "react-icons/io5";
import { PDFViewer } from "@react-pdf/renderer";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]); // State to hold complaint data
  const [selectedComplaint, setSelectedComplaint] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  // const [expandedIndex, setExpandedIndex] = useState([]); // State for accordion
  const [expandedComplaint, setExpandedComplaint] = useState(null);

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

  const toggleAccordion = (index) => {
    setExpandedComplaint(expandedComplaint === index ? null : index);
  };

  return (
    <>
      <div>
        {showPdf && selectedComplaint && (
          <div className="h-[100vh] m-3 z-10">
            <IoClose
              onClick={() => setShowPdf(false)}
              className="bg-slate-300 rounded-full text-4xl texl-bold text-red-600 cursor-pointer "
            />
            <PDFViewer width={"100%"} height={"100%"}>
              <ComplaintPdf complaints={selectedComplaint} />
            </PDFViewer>
          </div>
        )}

        <div className="p-6 bg-gray-50 min-h-screen ">
          <div className="text-center">
            <h1 className="font-extrabold text-4xl text-gray-800 mb-6">
              My Complaints
            </h1>
          </div>

          <div className="space-y-4 justify-center items-center flex flex-col">
            {complaints.map((complaint, index) => (
              <div
                key={complaint.c_id}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm w-1/2 
                "
              >
                <div
                  className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center text-center"
                  onClick={() => toggleAccordion(index)}
                >
                  <h2 className="text-lg font-bold text-gray-700 text-ceneter">
                    {complaint.complaint_type}
                  </h2>
                  {complaint.station === null ? (
                    <p className="bg-red-400 p-1 rounded-md">
                      Station Not assigned
                    </p>
                  ) : (
                    <p className="bg-green-200 p-1 rounded-md">
                      {complaint.station} Police Station
                    </p>
                  )}
                  <p>{complaint.complaint_date}</p>
                  <span className="text-gray-500">
                    {expandedComplaint === index ? "-" : "+"}
                  </span>
                </div>
                {expandedComplaint === index && (
                  <div className="bg-white p-6 space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-700">
                        Complaint ID
                      </h2>
                      <p className="text-gray-600">{complaint.c_id}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-700">
                        Complaint Date
                      </h2>
                      <p className="text-gray-600">
                        {complaint.complaint_date}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-700">
                        Complaint Type
                      </h2>
                      <p className="text-gray-600">
                        {complaint.complaint_type}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-700">
                        Full Name
                      </h2>
                      <p className="text-gray-600">{complaint.full_name}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-700">
                        NIC Number
                      </h2>
                      <p className="text-gray-600">{complaint.nic}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-700">
                        Address
                      </h2>

                      <p className="text-gray-600">
                        Address Line 1 : {complaint.address_1}
                      </p>
                      <p className="text-gray-600">
                        Address Line 2 : {complaint.address_2}
                      </p>
                      <p className="text-gray-600">
                        Town : {complaint.city}
                        <p>District : {complaint.district} </p>
                        <p>Province : {complaint.province}</p>
                      </p>
                      <p className="text-gray-600">
                        Postal Code : {complaint.postal_code}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-700">
                        Lost Details
                      </h2>
                      <p className="text-gray-600">
                        Date: {complaint.lost_date}
                      </p>
                      <p className="text-gray-600">
                        Time: {complaint.lost_time}
                      </p>
                      <p className="text-gray-600">
                        Location: {complaint.lost_location}
                      </p>
                      <p className="text-gray-600">
                        Last Known Date: {complaint.last_known_date}
                      </p>
                      <p className="text-gray-600">
                        Last Known Time: {complaint.last_known_time}
                      </p>
                      <p className="text-gray-600">
                        Last Known Location: {complaint.last_known_location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                        onClick={() =>
                          complaint.station === null
                            ? alert(
                                "The Police headquarters will assign your complaint to a relevant station soon. Followed by that, you may download your complaint as a PDF document."
                              )
                            : handleDownloadPdf(complaint)
                        }
                      >
                        Download PDF
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComplaints;
