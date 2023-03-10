const express = require('express');

const {
    get_users,
    get_unverified_users,
    get_user,
    register_user,
    login_user,
    update_user,
    verify_user,
    update_password,
    forgot_password,
    reset_password,
    delete_user
} = require('../controllers/userController');

const { verifyAdmin, verifyUser } = require('../utils/verificationHandler');

const router = express.Router();

router.get("/checkadmin", verifyAdmin, (req, res) => {
    res.status(200).json({ message: "You are authenticated!" });
});

router.route('/').get(get_users);
router.route('/verify/:id').put (verify_user);
router.route('/unverified').get(get_unverified_users);
router.route('/:id').get(get_user);
router.route('/register').post(register_user);
router.route('/login').post(login_user);
router.route('/update/:id').put(verifyUser, update_user);
router.route('/update/password/reset/:token').put(reset_password);
router.route('/update/password/forgot').put(forgot_password);
router.route('/update/password/:id').put(verifyUser, update_password);
router.route('/delete/:id').delete(verifyUser, delete_user);

module.exports = router 
