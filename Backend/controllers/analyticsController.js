const Analytics = require('../models/analytics');

exports.get_analytics = async (req, res, next) => {
    try {
        const analytics = await Analytics.find({ 'date.year': req.params.year });
        res.status(200).json({
            status: 'success',
            data: {
                analytics
            }
        });
    } catch (err) {
        next(err)
    }
};

exports.update_views_analytics = async (req, res, next) => {
    
    try {
        const analytics = await Analytics.findOne({ 'date.year': new Date().getFullYear() });
        if (analytics) {
            const month = new Date().getMonth();
            analytics.date.month[month].visits += 1;
            await analytics.save();
        } else {
            const newAnalytics = new Analytics({
                date: {
                    year: new Date().getFullYear(),
                    month: Array.from({ length: 12 }, () => ({
                        visits: 0,
                        registrations: 0,
                        interactions: 0
                    }))
                }
            });
            const month = new Date().getMonth();
            newAnalytics.date.month[month].visits += 1;
            await newAnalytics.save();
        }
        res.status(200).json({
            status: 'success',
            data: {
                analytics
            }
        });
    } catch (err) {
        next(err)
    }
}