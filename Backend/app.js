const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB');
})
.catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
})

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

/*
    import Routes
*/
const userRouter = require('./routers/userRouter');
const hostelRouter = require('./routers/hostelRouter');

app.use('/api/users', userRouter);
app.use('/api/hostels', hostelRouter);

module.exports = app