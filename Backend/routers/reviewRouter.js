const express = require('express');

const {
    get_reviews,
    get_user_reviews,
    get_flagged_reviews,
    flag_review,
    verify_review,
    remove_review
} = require('../controllers/reviewController');

const router = express.Router();

const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verificationHandler');

router.route('/user/:id').get(get_user_reviews);
router.route('/flagged').get(get_flagged_reviews);
router.route('/:hotelId').get(get_reviews);
router.route('/flag/:reviewId').put(flag_review);
router.route('/verify/:reviewId').put(verify_review);
router.route('/remove/:reviewId/:id').delete(remove_review);

module.exports = router 
