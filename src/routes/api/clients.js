/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()

// const { Op } = require('sequelize')

// const Client = require('../../models/Client')
const clients = require('../stores/clients') // eslint-disable-line no-unused-vars
// const clientService = require('../../../services/clients')

// Get all Clients
router.get('/clients', (req, res) => {
	clients.getClients(req.query.search).then( clients => {
		res.json(clients)
	})
})

// Add Client
router.post('/clients', (req, res) => {
	clients.createClient(req.body)
		.then( response => res.send(response) )
		.catch(error => res.send(error))
})

// Get Client
router.get('/clients/:uuid', (req, res) => {
	clients.getClient(req)
		.then( client => {
			res.json(client)
		})
		.catch( error => {
			res.json(error)
		})
})

// Delete Client
// router.delete("/clients/:uuid", (req, res) => {
// 	Client.destroy({
// 		where: {
// 			uuid: req.params.uuid
// 		}
// 	})
// 		.then(() => {
// 			res.send("Client deleted")
// 		})
// 		.catch(err => {
// 			res.send("Error: " + err)
// 		})
// })

// Update Client
router.put('/clients/:uuid', (req, res) => {
	// if (!req.body) {
	// 	res.status(400)
	// 	res.json({
	// 		error: 'Bad Data'
	// 	})
	// } else {
	// 	Client.clients.update(
	// 		req.body,
	// 		{ where: { uuid: req.params.uuid } }
	// 	)
	// 		.then(() => { res.send('Task Updated') })
	// 		.catch(err => res.send(err))
	// }
})

module.exports = router