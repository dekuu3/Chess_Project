const express = require('express')
const router = express.Router()

//Play quick game router
router.get('/', (req, res) => {
	res.render('play/index')
})

module.exports = router
