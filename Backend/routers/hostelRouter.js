const express = require('express');

const {
    get_hostels,
    get_hostel,
    register_hostel,
    update_hostel,
    post_review,
    update_review
} = require('../controllers/hostelController');

const router = express.Router();

router.route('/').get(get_hostels);
router.route('/:id').get(get_hostel);
router.route('/register').post(register_hostel);
router.route('/update/:id').put(update_hostel);
router.route('/review/:id').post(post_review);
router.route('/review/update/:id').put(update_review);

module.exports = router