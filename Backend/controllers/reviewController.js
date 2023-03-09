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

/*
    @desc gets all the reviews for a user
    @access Public
*/
exports.get_user_reviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ user: req.params.id }).populate('user hostel');
        res.status(200).json(reviews);
    } catch (err) {
        next(err)
    }
}

/*
    @desc flags review as inappropriate
    @access Private
*/
exports.flag_review = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        review.reported = true;
        await review.save();
        res.status(200).json({ message: 'Review flagged as inappropriate' });
    } catch(err) {
        next(err);
    }
}

/*
    @desc access all the flagged reviews
    @access Private
*/
exports.get_flagged_reviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ reported: true }).populate('user hostel');
        res.status(200).json(reviews);
    } catch(err) {
        next(err);
    }
}

/*
    @desc verifies a flagged review
    @access Private
*/
exports.verify_review = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        review.reported = false;
        await review.save();
        res.status(200).json({ message: 'Review verified' });
    } catch(err) {
        next(err);
    }
}

/* 
    @desc removes a review
    @access Private
*/
exports.remove_review = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        console.log(review.hostel)
        await User.findByIdAndUpdate(review.user, { $pull: { reviews: review._id } });
        await Hostel.findByIdAndUpdate(review.hostel, { $pull: { reviews: review._id } });
        const hostel = await Hostel.findById(review.hostel)
        hostel.compute_rating_after_delete(review.overall_rating);
        hostel.compute_ranking();
        await hostel.save();
        await review.remove();
        res.status(200).json({ message: 'Review removed' });
    } catch(err) {
        next(err);
    }
}