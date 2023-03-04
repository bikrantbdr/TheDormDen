const express = require('express');

const {
    get_hostels,
    get_hostel,
    register_hostel,
    update_hostel,
    post_review,
    update_review,
    get_featured_hostels,
    get_all_hostels,
    get_unverified_hostels,
    delete_hostel
} = require('../controllers/hostelController');

const router = express.Router();

const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verificationHandler');

router.route('/').get(get_hostels);
router.route('/featured').get(get_featured_hostels);
router.route('/unverified').get(get_unverified_hostels);
router.route('/all').get(get_all_hostels);
router.route('/:id').get(get_hostel);
router.route('/register').post(register_hostel);
router.route('/update/:id').put(verifyUser, update_hostel);
router.route('/review/:id').post(post_review);
router.route('/review/update/:id').put(update_review);
router.route('/delete/:id').delete(verifyUser, delete_hostel);

module.exports = router