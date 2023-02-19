const User = require('../models/user');
const Hostel = require('../models/hostel');
const Review = require('../models/review');

/*
    @desc gets all the reviews for a hostel
    @access Public
*/
exports.get_reviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ hostel: req.params.hotelId }).populate('user');
        res.status(200).json(reviews);
    } catch (err) {
        next(err)
    }
}