const mongoose = require('mongoose');
const Review = require('./review');

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: false
    },
    document: {
        type: String,
        required: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // longitude and latitude  format !extremely important
            require: true
        }
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
        available_seats: {
            type: Number,
            required: true,
            max: 4
        },
        room_number: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
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

hostelSchema.index({ "location": "2dsphere" });

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
}

hostelSchema.methods.compute_rating = function(overall_rating) {
    this.hostel_rating = (this.hostel_rating * (this.reviews.length-1) + overall_rating) / (this.reviews.length);
    this.number_of_reviews = this.reviews.length;
}

// after deleting review from hostel compute rating
hostelSchema.methods.compute_rating_after_delete = function(overall_rating) {
    this.hostel_rating = (this.hostel_rating * (this.reviews.length) - overall_rating) / (this.reviews.length-1);
    this.number_of_reviews = this.reviews.length-1;
}

hostelSchema.methods.compute_ranking = async function() {
/* 
    R – The item's own rating. R is the average of the item's votes. (For example, if an item has no votes, its R is 0. If someone gives it 5 stars, R becomes 5. If someone else gives it 1 star, R becomes 3, the average of [1, 5]. And so on.)
    C – The average item's rating. Find the R of every single item in the database, including the current one, and take the average of them; that is C. (Suppose there are 4 items in the database, and their ratings are [2, 3, 5, 5]. C is 3.75, the average of those numbers.)
    v – The number of votes for an item. (To given another example, if 5 people have cast votes on an item, v is 5.)
    m – The tuneable parameter. The amount of "smoothing" applied to the rating is based on the number of votes (v) in relation to m. Adjust m until the results satisfy you. And don't misinterpret IMDb's description of m as "minimum votes required to be listed" – this system is perfectly capable of ranking items with less votes than m.
    rating = (R * v + C * m) / (v + m); 

    For our case, we will take m = 15
*/
    const m = 15;
    const R = this.hostel_rating;
    const v = this.number_of_reviews;
    reviews = await Review.find({})
    let C = 0;
    reviews.forEach(review => {
        C += review.overall_rating;
    })
    C /= reviews.length;
    this.ranking = (R * v + C * m) / (v + m);
}

module.exports = mongoose.model('Hostel', hostelSchema);

