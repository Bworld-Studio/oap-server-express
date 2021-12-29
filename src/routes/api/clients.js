/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()

const clientsService = include('services/clients')
const path = '/clients'

// Get all Clients
router.get(path, (req, res) => {
	clientsService.getClients(req.query.search).then( clients => {
		res.json(clients)
	})
})

// Add Client
router.post('/clients', (req, res) => {
	clientsService.createClient(req.body)
		.then( response => res.send(response) )
		.catch(error => res.send(error))
})

// Get Client
router.get(path+'/:uuid', (req, res) => {
	clientsService.getClient(req)
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
router.put(path+'/:uuid', (req, res) => {
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