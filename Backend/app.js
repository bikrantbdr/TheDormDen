<<<<<<< HEAD
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookie_parser = require('cookie-parser');

app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB');
})
.catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
})

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json({limit: '25mb'}));
app.use(cookie_parser());
app.use(middleware.requestLogger);

/*
    import Routes
*/
const userRouter = require('./routers/userRouter');
const hostelRouter = require('./routers/hostelRouter');
const reviewRouter = require('./routers/reviewRouter');
const analyticsRouter = require('./routers/analyticsRouter');

app.use('/api/reviews', reviewRouter);
app.use('/api/users', userRouter);
app.use('/api/hostels', hostelRouter);
app.use('/api/analytics', analyticsRouter);

app.use((err, req, res, next) => {
    err.status = err.status || 500
    err.message = err.message || 'Internal Server Error'
    res.status(err.status).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
})

=======
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookie_parser = require('cookie-parser');

app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB');
})
.catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
})

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json({limit: '25mb'}));
app.use(cookie_parser());
app.use(middleware.requestLogger);

/*
    import Routes
*/
const userRouter = require('./routers/userRouter');
const hostelRouter = require('./routers/hostelRouter');
const reviewRouter = require('./routers/reviewRouter');
const analyticsRouter = require('./routers/analyticsRouter');

app.use('/api/reviews', reviewRouter);
app.use('/api/users', userRouter);
app.use('/api/hostels', hostelRouter);
app.use('/api/analytics', analyticsRouter);

app.use((err, req, res, next) => {
    err.status = err.status || 500
    err.message = err.message || 'Internal Server Error'
    res.status(err.status).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
})

>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
module.exports = app