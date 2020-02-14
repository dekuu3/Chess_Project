if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

//dependencies
const express = require('express') //express api
const expressLayouts = require('express-ejs-layouts') //layout support for ejs
const morgan = require('morgan') //HTTP request logger
const helmet = require('helmet') //helps secure express apps by setting/hiding various HTTP headers

//routers
const indexRouter = require('./routes/index')
const playRouter = require('./routes/play')
const challengeAFriendRouter = require('./routes/challengeafriend')
const scoreboardRouter = require('./routes/scoreboard')
const aboutRouter = require('./routes/about')
const errorMiddleWaresRouter = require('./routes/errormiddlewares')

//middlewares
const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(morgan('common'))
app.use(helmet())

//mongoClient constructor
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true //To use the new server discover and monitoring engine as the old one had deprecated
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log('Connected to Mongoose'))

//routers
app.use('/', indexRouter)
app.use('/play', playRouter)
app.use('/challengeafriend', challengeAFriendRouter)
app.use('/scoreboard', scoreboardRouter)
app.use('/about', aboutRouter)

//'Not Found' error middleware
app.use(errorMiddleWaresRouter.notFound)

//General error middleware - Checks if status code is 200, send out a 500 status code, otherwise use previously specified status code
app.use(errorMiddleWaresRouter.errorHandler)

app.listen(process.env.PORT || 8080)