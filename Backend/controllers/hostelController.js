const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Hostel = require('../models/hostel');


/*
    @desc gets token from request header
    @access Private
*/
const getToken = (req) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
}

/*
    @route POST /api/hostels/register
    @desc Register a new hostel
    @access Public
*/
exports.register_hostel = async (req, res, next) => {
    const body = req.body;

    const token = getToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const hostel = new Hostel({
        name: body.name,
        location: body.location,
        description: body.description,
        for_gender: body.for_gender,
        images: body.images || [],
        verified: body.verified,
        owner: user._id,
        amenities: body.amenities || [],
        rooms: body.rooms || [],
        reviews: []
    });

    const savedHostel = await hostel.save();
    user.hostel_listings = user.hostel_listings.concat(savedHostel._id);
    await user.save();

    res.status(201).json(savedHostel);
}
