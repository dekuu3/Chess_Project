//'Not Found' error middleware
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

//General error middleware - Check if status code is 200, send out a 500 status code, otherwise use previously specified status code
const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? '🚫' : error.stack
	})
}

module.exports = {
  notFound,
  errorHandler
}