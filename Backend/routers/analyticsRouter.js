const express = require('express');

const {
    get_analytics,
    update_views_analytics
} = require('../controllers/analyticsController');

const router = express.Router();

router.route('/update').get(update_views_analytics);
router.route('/:year').get(get_analytics);

module.exports = router