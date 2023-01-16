const express = require('express');

const {
    register_hostel
} = require('../controllers/hostelController');

const router = express.Router();

router.route('/register').post(register_hostel);

module.exports = router