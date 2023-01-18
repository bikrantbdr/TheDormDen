const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Hostel = require('../models/hostel');
const Review = require('../models/review');

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
    @route GET /api/hostels
    @desc Get all hostels
    @access Public
*/
exports.get_hostels = async (req, res, next) => {
    const hostels = await Hostel.find({});
    res.status(200).json(hostels);
}

/*
    @route GET /api/hostels/:id
    @desc Get a hostel
    @access Public
*/
exports.get_hostel = async (req, res, next) => {
    const hostel= await Hostel.findById(req.params.id);
    res.status(200).json(hostel);
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

/*
    @route PUT /api/hostels/:id
    @desc Update a hostel
    @access Owner
*/
exports.update_hostel = async (req, res, next) => {
    const body = req.body;

    const token = getToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const hostel = await Hostel.findById(req.params.id);

    if (hostel.owner.toString() === user.id.toString()) {
        /* need to learn about the runValidators and useFindAndModify options */
        /* front end will send object as a whole to update */
        const updatedHostel = await Hostel.findByIdAndUpdate(req.params.id, body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json(updatedHostel);
    }
}

/*
    @route PUT /api/hostels/:id
    @desc post review for a hostel
    @access Private
*/

exports.post_review = async (req, res, next) => {
    const body = req.body;

    const token = getToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    console.log(user);
    const hostel = await Hostel.findById(req.params.id);
    console.log(hostel);
    const review = new Review({
        cleanliness: Number(body.cleanliness),
        food: Number(body.food),
        staff: Number(body.staff),
        amenities: Number(body.amenities),
        overall_rating: Number((Number(body.cleanliness) + Number(body.food) + Number(body.staff) + Number(body.amenities)) / 4),
        comment: body.comment,
        user: user._id,
        hostel: hostel._id
    })
    console.log(review);
    const savedReview = await review.save();
    hostel.reviews = hostel.reviews.concat(savedReview._id);
    await hostel.save();
    user.reviews = user.reviews.concat(savedReview._id);
    await user.save();
    res.status(200).json(savedReview);
}

/*
    @route update review /review/update/:id
    @desc update review for a hostel
    @access Private
*/

exports.update_review = async (req, res, next) => {
    const body = req.body;

    const token = getToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const review = await Review.findById(req.params.id);

    if (review.user.toString() === user.id.toString()) {
        const updatedReview = {
            ...body,
            overall_rating: Number((Number(body.cleanliness) + Number(body.food) + Number(body.staff) + Number(body.amenities)) / 4),
        }
        const savedReview = await Review.findByIdAndUpdate(req.params.id, updatedReview, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json(savedReview);
    }
}