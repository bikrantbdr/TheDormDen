const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/*
    @route POST /api/users/register
    @desc Register a new user
    @access Public
*/
exports.register_user = async (req, res, next) => {
    const body = req.body;

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
            profile_picture: body.profile_picture,
            document: body.document || null,
        },
        reviews: [],
        hostel_listings: []
    })

    const savedUser = await user.save();
    res.json(savedUser);
}

/*
    @route POST /api/users/login
    @desc Login a user
    @access Public
*/
exports.login_user = async (req, res, next) => {
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
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).send({ token, username: user.username, id: user._id });
}
