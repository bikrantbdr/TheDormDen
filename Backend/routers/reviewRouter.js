const express = require('express');

const {
    get_reviews
} = require('../controllers/reviewController');

const router = express.Router();

router.route('/:hotelId').get(get_reviews);

module.exports = router 
