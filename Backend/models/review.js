<<<<<<< HEAD
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    overall_rating: {
        type: Number,
        required: true
    },
    cleanliness: {
        type: Number,
        required: true
    },
    food: {
        type: Number,
        required: true
    },
    staff: {
        type: Number,
        required: true
    },
    amenities: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    },
    reported: {
        type: Boolean,
        default: false
    }
}
, { timestamps: true });

reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

=======
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    overall_rating: {
        type: Number,
        required: true
    },
    cleanliness: {
        type: Number,
        required: true
    },
    food: {
        type: Number,
        required: true
    },
    staff: {
        type: Number,
        required: true
    },
    amenities: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    },
    reported: {
        type: Boolean,
        default: false
    }
}
, { timestamps: true });

reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
module.exports = mongoose.model('Review', reviewSchema);