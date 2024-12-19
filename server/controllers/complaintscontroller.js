const { insertComplaint } = require("../models/complaintModel");

const createComplaint = async (req, res) => {
  const {
    full_name,
    nic,
    complaint_date,
    complaint_type,
    address_1,
    address_2,
    city,
    district,
    province,
    lost_date,
    lost_time,
    postal_code,
    lost_location,
    last_known_date,
    last_known_time,
    last_known_location,
  } = req.body;

  if (!full_name || !nic) {
    return res.status(400).json({
      error: "These fields are required",
    });
  }
  try {
    const result = await insertComplaint({
      full_name,
      nic,
      complaint_date,
      complaint_type,
      address_1,
      address_2,
      city,
      district,
      province,
      postal_code,
      lost_date,
      lost_time,
      lost_location,
      last_known_date,
      last_known_time,
      last_known_location,
    });
    res.status(201).json({
      message: "record inserted successfully",
      record: result,
    });
  } catch (error) {
    console.error("error inserting data", error.message);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = { createComplaint };
