const express = require('express');

const {
    get_users,
    get_user,
    register_user,
    login_user,
    update_user
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(get_users);
router.route('/:id').get(get_user);
router.route('/register').post(register_user);
router.route('/login').post(login_user);
router.route('/update/:id').put(update_user);

module.exports = router 
