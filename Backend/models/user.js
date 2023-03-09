const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },  
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    }, 
    usertype: {
        typeof_user: {
            type: String,
            required: true
        },
        is_verified: {
            type: Boolean,
            default: false
        }
    },
    profile: {
        first_name: {
            type: String,
            required: true
        },
        middle_name: {
            type: String,
            required: false
        },
        last_name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        profile_picture: {
            type: String,
            // we are not using this field for now
            required: false
        },
        document: {
            type: String,
            required: false
        }
    },
    reviews: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
            required: false
        }
    ],
    hostel_listings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hostel',
            required: false
        }
    ],
    reset_password_token: {
        type: String,
        required: false
    },
    reset_token_expires: {
        type: Date,
        required: false
    }
}, { timestamps: true });

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema);
