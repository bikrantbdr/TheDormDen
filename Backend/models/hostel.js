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
            type: String,
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
    available_rooms: {
       one_seater:{
            type: Number,
            default: 0
       },
       two_seater:{
            type: Number,
            default: 0
       },
       three_seater:{
            type: Number,
            default: 0
       },
       four_seater:{
            type: Number,
            default: 0
       }
    },
    number_of_reviews: {
        type: Number,
        default: 0
    },
    hostel_rating:{
        type: Number,
        default: 0
    },
    ranking:{
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
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

hostelSchema.methods.compute_availability = function() {
    this.rooms.forEach(room => {
        if (room.availability) {
            this.available_rooms[room.room_type]++;
        }
    })
    console.log(this.available_rooms);
}

hostelSchema.methods.compute_rating = function(overall_rating) {
    this.hostel_rating = (this.hostel_rating * (this.reviews.length-1) + overall_rating) / (this.reviews.length);
    this.number_of_reviews = this.reviews.length;
}


module.exports = mongoose.model('Hostel', hostelSchema);

