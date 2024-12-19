const pool = require("../database.js");
const insertComplaint = async ({
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
}) => {
  const query = `
        INSERT INTO nic_complaints (
            full_name, nic, complaint_date, complaint_type, address_1, address_2, city, district, province, postal_code,
            lost_date, lost_time, lost_location,
            last_known_date, last_known_time, last_known_location
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *;
    `;

  const values = [
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
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { insertComplaint };
