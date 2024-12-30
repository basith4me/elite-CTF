import React, { useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const LostNic = () => {
  const date = new Date();

  const [formData, setFormData] = useState({
    c_id: "",
    full_name: "",
    nic: "",
    complaint_date: date,
    complaint_type: "",
    address_1: "",
    address_2: "",
    city: "",
    district: "",
    province: "",
    postal_code: "",
    lost_date: "",
    lost_time: "",
    lost_location: "",
    last_known_date: "",
    last_known_time: "",
    last_known_location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/complaints",
        formData
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      console.log("Data inserted successfully:", response.data);
      // alert("complaint added successfully!");
      toast.success("Complaint added successfully!");
      setFormData({
        c_id: "",
        full_name: "",
        nic: "",
        complaint_date: "",
        complaint_type: "",
        address_1: "",
        address_2: "",
        city: "",
        district: "",
        province: "",
        postal_code: "",
        lost_date: "",
        lost_time: "",
        lost_location: "",
        last_known_date: "",
        last_known_time: "",
        last_known_location: "",
      });
    } catch (error) {
      console.error("Error inserting data:", error);
      // alert("Failed to create user!");
      toast.error("Failed to add complaint");
    }
  };
  return (
    <>
      {/* <button onClick={handledate}>log</button> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          action=""
          className="bg-white shadow-md rounded-lg p-8 space-y-6 w-3/4"
        >
          <h2 className="text-2xl font-bold text-gray-700 border-b pb-4">
            Lost NIC Reporting Form
          </h2>

          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  value={formData.full_name}
                  onChange={handleChange}
                  name="full_name"
                  required
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="nicNumber"
                  className="block font-medium text-gray-700"
                >
                  NIC Number
                </label>
                <input
                  value={formData.nic}
                  onChange={handleChange}
                  name="nic"
                  required
                  id="nicNumber"
                  type="text"
                  placeholder="NIC Number"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="complaint_type"
                  className="block font-medium text-gray-700"
                >
                  Complaint Type
                </label>
                <select
                  name="complaint_type"
                  id="complaint_type"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                  value={formData.complaint_type}
                  onChange={handleChange}
                >
                  <option value="lost NIC">Lost NIC</option>
                  <option value="lost Passport">Lost Passport</option>
                  <option value="accident">Accident</option>
                  <option value="pick-Pocket">Pick-pocket</option>
                  <option value="theft">Theft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="addressLine1"
                  className="block font-medium text-gray-700"
                >
                  Address Line 1
                </label>
                <input
                  value={formData.address_1}
                  onChange={handleChange}
                  name="address_1"
                  required
                  id="addressLine1"
                  type="text"
                  placeholder="Address Line 1"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="addressLine2"
                  className="block font-medium text-gray-700"
                >
                  Address Line 2
                </label>
                <input
                  value={formData.address_2}
                  onChange={handleChange}
                  name="address_2"
                  id="addressLine2"
                  type="text"
                  placeholder="Address Line 2"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block font-medium text-gray-700 "
                >
                  City
                </label>
                <input
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                  required
                  id="city"
                  type="text"
                  placeholder="City"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="district"
                  className="block font-medium text-gray-700"
                >
                  District
                </label>
                <input
                  value={formData.district}
                  onChange={handleChange}
                  name="district"
                  id="district"
                  type="text"
                  placeholder="District"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="province"
                  className="block font-medium text-gray-700"
                >
                  Province
                </label>
                <input
                  value={formData.province}
                  onChange={handleChange}
                  name="province"
                  id="province"
                  type="text"
                  placeholder="Province"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  value={formData.postal_code}
                  onChange={handleChange}
                  name="postal_code"
                  id="postalCode"
                  type="number"
                  placeholder="Postal Code"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Lost NIC Details */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">
              Lost NIC Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="lostDate"
                  className="block font-medium text-gray-700"
                >
                  Lost Date
                </label>
                <input
                  value={formData.lost_date}
                  onChange={handleChange}
                  name="lost_date"
                  required
                  id="lostDate"
                  type="date"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="lostTime"
                  className="block font-medium text-gray-700"
                >
                  Lost Time
                </label>
                <input
                  value={formData.lost_time}
                  onChange={handleChange}
                  name="lost_time"
                  required
                  id="lostTime"
                  type="time"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="lostLocation"
                  className="block font-medium text-gray-700"
                >
                  Lost Location
                </label>
                <input
                  value={formData.lost_location}
                  onChange={handleChange}
                  name="lost_location"
                  id="lostLocation"
                  type="text"
                  placeholder="Lost Location"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Last Known Details */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">
              Last Known Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="lastKnownDate"
                  className="block font-medium text-gray-700"
                >
                  Last Known Date
                </label>
                <input
                  value={formData.last_known_date}
                  onChange={handleChange}
                  name="last_known_date"
                  required
                  id="lastKnownDate"
                  type="date"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="lastKnownTime"
                  className="block font-medium text-gray-700"
                >
                  Last Known Time
                </label>
                <input
                  value={formData.last_known_time}
                  onChange={handleChange}
                  name="last_known_time"
                  required
                  id="lastKnownTime"
                  type="time"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="lastKnownLocation"
                  className="block font-medium text-gray-700"
                >
                  Last Known Location
                </label>
                <input
                  value={formData.last_known_location}
                  onChange={handleChange}
                  name="last_known_location"
                  required
                  id="lastKnownLocation"
                  type="text"
                  placeholder="Last Known Location"
                  className="border rounded-md w-full p-2 mt-1 focus:bg-blue-100"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default LostNic;
