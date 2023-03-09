<<<<<<< HEAD
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = http.createServer(app)

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
=======
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = http.createServer(app)

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
