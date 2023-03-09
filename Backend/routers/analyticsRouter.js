<<<<<<< HEAD
const express = require('express');

const {
    get_analytics,
    update_views_analytics
} = require('../controllers/analyticsController');

const router = express.Router();

router.route('/update').get(update_views_analytics);
router.route('/:year').get(get_analytics);

=======
const express = require('express');

const {
    get_analytics,
    update_views_analytics
} = require('../controllers/analyticsController');

const router = express.Router();

router.route('/update').get(update_views_analytics);
router.route('/:year').get(get_analytics);

>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
module.exports = router