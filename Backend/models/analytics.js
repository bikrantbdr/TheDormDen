<<<<<<< HEAD
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    date: {
        year: {
            type: Number,
            required: true
        },
        month: [
            {
                visits: {
                    type: Number,
                    default: 0,
                    required: true
                },
                registrations: {
                    type: Number,
                    default: 0,
                    required: true
                },
                interactions: {
                    type: Number,
                    default: 0,
                    required: true
                }
            }
        ]
    }
});

=======
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    date: {
        year: {
            type: Number,
            required: true
        },
        month: [
            {
                visits: {
                    type: Number,
                    default: 0,
                    required: true
                },
                registrations: {
                    type: Number,
                    default: 0,
                    required: true
                },
                interactions: {
                    type: Number,
                    default: 0,
                    required: true
                }
            }
        ]
    }
});

>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
module.exports = mongoose.model('Analytics', analyticsSchema);