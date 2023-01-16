const express = require('express');

const {
    register_user,
    login_user
} = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(register_user);
router.route('/login').post(login_user);

module.exports = router 
