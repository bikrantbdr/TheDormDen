const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    for_gender: {
        type: Number,
        required: true
    },
    images: [
        {
            type: String,
        }
    ],
    verified: { 
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amenities: [
        {
            type: String,
            required: true
        }
    ],
    rooms: [ {
        room_type: {
            type: Number,
            required: true
        },
        availability: {
            type: Boolean,
            default: false,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        attached_bathroom: {
            type: Boolean,
            default: false
        },
        direct_sunlight: {
            type: Boolean,
            default: false
        },
        balcony: {
            type: Boolean,
            default: false
        }
    } ],
    reviews: [
        {
            review_id: {
                type: String,
                required: true
            },
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
            }
        }
    ]
}, { timestamps: true });

hostelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Hostel', hostelSchema);

