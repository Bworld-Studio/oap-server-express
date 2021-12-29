const express = require('express')
const router = express.Router()

const files = include('exts/files')

router.put('/updates/:file', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	files.readFile(req.params.file)
		.then(ts => res.json(ts) )
		.catch(err => res.send('Error: ' + err) )
})

router.get('/updates/:file', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	files.readLastUpdatedFileDate(req.params.file)
		.then(ts => res.json(ts) )
		.catch(err => res.send('Error: ' + err) )
})

module.exports = router