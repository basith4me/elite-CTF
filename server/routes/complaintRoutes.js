const express = require("express");
const {createComplaint} = require('../controllers/complaintscontroller')

const router = express.Router();

router.post('/', createComplaint);

module.exports = router;
