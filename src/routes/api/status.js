const express = require('express')
const router = express.Router()

const path = '/status'

// Get orders
router.get(path, (req, res) => {
	res.json(200)
})

module.exports = router