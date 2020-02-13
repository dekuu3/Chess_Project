if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

//dependencies
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//routers
const indexRouter = require('./routes/index')
const playRouter = require('./routes/play')
const challengeAFriendRouter = require('./routes/challengeafriend')
const scoreboardRouter = require('./routes/scoreboard')
const aboutRouter = require('./routes/about')

//middleware
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

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

app.listen(process.env.PORT || 8080)