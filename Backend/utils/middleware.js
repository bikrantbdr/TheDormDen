<<<<<<< HEAD
const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    next(err)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
=======
const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    next(err)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
}