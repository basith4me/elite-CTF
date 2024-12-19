const express = require("express");
const cors = require("cors");
const complaintRoute = require("./routes/complaintRoutes.js");
const pool = require("./database.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/complaints", complaintRoute);

app.get("/api/complaints", async (req, res) => {
  try {
    // Define the query to fetch all rows from the complaints table
    const query = "SELECT * FROM nic_complaints";

    // Execute the query
    const result = await pool.query(query);

    // Check if no complaints are found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No complaints found" });
    }

    // Return the fetched rows
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
//assign station
app.post("/api/complaints/assign_station", async (req, res) => {
  try {
    const { c_id, station } = req.body;

    if (!c_id || !station) {
      return res.status(400).json({ error: "Complaint id required" });
    }
    const query = `UPDATE nic_complaints SET station = $1 WHERE c_id = $2 RETURNING *`;
    const values = [station, c_id];

    const result = await pool.query(query, values);

    if (result.rows.lenght === 0) {
      return res.status(400).json({ error: "Complaint not found" });
    }
    res.status(200).json({
      message: "station successfully added",
      complaint: result.rows[0],
    });
  } catch (error) {
    console.error("Error assigning sation :", error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

// fetch station
app.get("/api/complaints/stations", async (req, res) => {
  try {
    const query = `SELECT DISTINCT station FROM nic_complaints WHERE station IS NOT NULL`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching stations :", error);
    res.status(500).json({ error: "Failed to fetch stations" });
  }
});
//NULL stations
app.get("/api/complaints/null_stations", async (req, res) => {
  try {
    const query = "SELECT * FROM nic_complaints WHERE station IS NULL ";

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No complaints found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//fetch complaints
app.get("/api/complaints/by_station", async (req, res) => {
  try {
    const { station } = req.query;
    const query = `SELECT * FROM nic_complaints WHERE station = $1`;
    const result = await pool.query(query, [station]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching complaints by station:", error);
    res.status(500).json({ error: "Failed to fetch complaints by station" });
  }
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
