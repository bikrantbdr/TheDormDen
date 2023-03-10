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

module.exports = mongoose.model('Analytics', analyticsSchema);