const express = require('express')
const router = express.Router()

//challengeafriend router
router.get('/', (req, res) => {
	res.render('challengeafriend/index')
})

module.exports = router
