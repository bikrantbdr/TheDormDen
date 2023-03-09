const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Hostel = require('../models/hostel');
const Review = require('../models/review');
const crypto = require('crypto');
const sendEmail = require('../utils/mailing');
const cloudinary = require("cloudinary");

/*
    @desc gets token from request header
    @access Private
*/
const getToken = (req) => {
    const { token } = req.cookies;
    if (token) {
        return token;
    }
    return null;
}

/* 
    @desc create reset password token
    @access Private
*/
const createResetPasswordToken = async () => {
    const resetToken = crypto.randomBytes(20).toString('hex');
    const reset_password_token = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    const reset_token_expires = Date.now() + 10 * 60 * 1000;
    return { resetToken, reset_password_token, reset_token_expires };
}


/*
    @route GET /api/users
    @desc Get all users
    @access Public
*/
exports.get_users = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch(err) {
        next(err)
    }
}

/*
    @route GET /api/users/:id
    @desc Get a user
    @access Public
*/
exports.get_user = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate("hostel_listings")
        res.status(200).json(user);
    } catch(err) {
        next(err)
    }
}

/*
    @route POST /api/users/register
    @desc Register a new user
    @access Public
*/
exports.register_user = async (req, res, next) => {
    try{
        const body = req.body;
    
        const profilecloud = await cloudinary.v2.uploader.upload(body.profile_picture, {
            folder: "avatars",
            width: 1020,
            crop: "scale",
          });
        const documentcloud = await cloudinary.v2.uploader.upload(body.document, {
            folder: "studentdocuments",
            width: 1020,
            crop: "scale",
          });
    
        const saltRounds = 10;
        const passwordHash = bcrypt.hashSync(body.password, saltRounds);
        
        const user = new User({
            username: body.username,
            email: body.email,
            passwordHash: passwordHash,
            usertype: {
                typeof_user: body.typeof_user,
            },
            profile: {
                first_name: body.first_name,
                middle_name: body.middle_name,
                last_name: body.last_name,
                gender: body.gender,
                phone_number: body.phone_number,
                address: body.address,
                profile_picture: profilecloud.secure_url,
                document: documentcloud.secure_url || null,
            },
            reviews: [],
            hostel_listings: []
        })
    
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err) {
        next(err)
    }
}

/*
    @route POST /api/users/login
    @desc Login a user
    @access Public
*/
exports.login_user = async (req, res, next) => {
    try {
        const { username, password } = req.body;
    
        const user = await User.findOne({ username });
    
        const correctPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash);
    
        if (!(user && correctPassword)) {
            return res.status(401).json({
                error: 'Invalid username or password'
            });
        }
    
        const userForToken = {
            username: user.username,
            id: user._id,
            isAdmin: user.usertype.typeof_user === "admin" ? true : false
        };
    
        const token = jwt.sign(userForToken, process.env.SECRET);
    
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
    
        res.status(200).cookie("token", token, options).send({ token, username: user.username, id: user._id });
    } catch(err) {
        next(err)
    }
}

/*
    @route PUT /api/users/update/:id
    @desc Update a user
    @access Private
*/
exports.update_user = async (req, res, next) => {
    try{
        const body = req.body;    
        console.log("body passed", body);
        let SecureURL = ""
        const token = getToken(req);
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' });
        }
        const user = await User.findById(decodedToken.id);

        if(body.profile_picture) {
            if(typeof body.profile_picture === "string") {
                SecureURL = body.profile_picture;
            } else {
                const profilecloud = await cloudinary.v2.uploader.upload(body.profile_picture, {
                    folder: "avatars",
                    width: 1020,
                    crop: "scale",
                });
                SecureURL = profilecloud.secure_url;
            }
        }
        const data = {
            username: body.username,
            email: body.email,
            profile: {
                first_name: body.first_name,
                middle_name: body.middle_name,
                last_name: body.last_name,
                gender: body.gender,
                phone_number: body.phone_number,
                address: body.address,
                profile_picture: SecureURL,
            }

        }
    
        /* if user is updating username we have to update the token */
        if(user) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });
            res.status(200).json(updatedUser);
        }
    } catch(err) {
        next(err)
    }
}

/*
    @route UPDATE PASSWORD /api/users/update/password/:id
    @desc Update a user's password
    @access Private
*/
exports.update_password = async (req, res, next) => {
    try {
        const body = req.body;
        
        const token = getToken(req);
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' });
        }
    
        const user = await User.findById(decodedToken.id);
        const correctPassword = user === null ? false : await bcrypt.compare(body.old_password, user.passwordHash);
    
        if(correctPassword) {
            const saltRounds = 10;
            const passwordHash = bcrypt.hashSync(body.new_password, saltRounds);
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { passwordHash }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });
            res.status(200).json(updatedUser);
        }
        else{
            res.status(401).json({ error: 'Incorrect password' });
        }
    } catch(err) {
        next(err)
    }
}

/*
    @route FORGOT PASSWORD /api/users/update/password/forgot
    @desc Send a user a password reset link
    @access Private
*/
exports.forgot_password = async (req, res, next) => {
    try {
        const body = req.body
    
        const user = await User.findOne({ email: body.email })
        const { resetToken, reset_password_token, reset_token_expires } = await createResetPasswordToken();
        const updatedUserResetToken = await User.findByIdAndUpdate(user._id, { reset_password_token, reset_token_expires }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    
        /* mail options configured */
        const resetPasswordLink = `${req.protocol}://${req.get('host')}/new_password/${resetToken}`;
        const message = `
            You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
            ${resetPasswordLink}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n
        `;
        const options = {
            email: body.email,
            subject: 'Reset Password',
            message
        }
    
        await sendEmail(options);
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        })
    } catch(err) {
        next(err)
    }
}

/*
    @route RESET PASSWORD /api/users/update/password/reset/:token
    @desc Reset a user's password
    @access Private
*/
exports.reset_password = async (req, res, next) => {
    try {

        const body = req.body;
    
        const reset_password_token = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');
    
        const user = await User.findOne({ 
            reset_password_token,
            reset_token_expires: { $gt: Date.now() }
        });
    
        if(user) {
            const saltRounds = 10;
            const passwordHash = bcrypt.hashSync(body.new_password, saltRounds);
            const updatedUser = await User.findByIdAndUpdate(user._id, { 
                passwordHash,
                reset_password_token: undefined,
                reset_token_expires: undefined }, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                });
                await res.status(200).json(updatedUser);
            } else {
                res.status(401).json({ error: 'Invalid or expired token' });
            }
    } catch(err) {
        next(err)
    }
}

/*
    @route GET /api/users/unverified
    @desc Get all unverified users
    @access Public
*/

exports.get_unverified_users = async (req, res, next) => {
    try {
        const users = await User.find({ 'usertype.is_verified': false });
        res.status(200).json(users);
    } catch(err) {
        next(err)
    }
}

/* 
    @route GET /api/users/verify/:id
    @desc Verify a user
    @access Private
*/
exports.verify_user = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { 'usertype.is_verified': true }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json(user);
    } catch(err) {
        next(err)
    }
}

/* 
    @route DELETE /api/users/delete/:id
    @desc Delete a user
    @access Private
*/
exports.delete_user = async (req, res, next) => {
    try{
        const user = req.params.id;
        const hostels = await Hostel.find({ owner: user });
        const reviews = await Review.find({ user: user });
        
        await Promise.all(hostels.map(hostel =>  {
            Hostel.findByIdAndDelete(hostel._id);
        }))
        await Promise.all(reviews.map(review =>  {
            Review.findByIdAndDelete(review._id);
        }))
        const deletedUser = await User.findByIdAndDelete(user);
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            deletedUser
        });
    } catch(err) {
        next(err)
    }
}

    