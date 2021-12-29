/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Op } = require('sequelize')
const Client = include('models/Client')
const { v4: uuidv4 } = require('uuid')

// Get all Clients
const getClients = (search) => {
	const promise = new Promise((resolve, reject) => {
		if ( search != undefined ) {	// Search API
			let query = {
				[Op.or]: [
					{ numSS: { [Op.like]: search + '%' } },
					{ lastName: { [Op.like]: search + '%' } },
					{ firstName: { [Op.like]: search + '%' } }
				]
			}
			Client.clients_id.findAll( { where: query } )
				.then(clients => {
					resolve(clients)
				})
				.catch(err => { reject('Error: ' + err) })
		}
		else {
			Client.clients_id.findAll()
				.then(clients => {
					resolve(clients)
				})
				.catch(err => { reject('Error: ' + err) })
		}
	})
	return promise
}

const searchClients = (search) => {
	const promise = new Promise((resolve, reject) => {
		let query = {
			[Op.or]: [
				// { nir: { [Op.like]: search + '%' } },
				{ lastName: { [Op.like]: search + '%' } },
				{ maidenName: { [Op.like]: search + '%' } },
				{ firstName: { [Op.like]: search + '%' } }
			]
		}
		Client.clients_id.findAll( { where: query } )
			.then(clients => {
				resolve(clients)
			})
			.catch(err => { reject('Error: ' + err) })
	})
	return promise
}

// eslint-disable-next-line no-unused-vars
const getClient = (request) => {
	const promise = new Promise((resolve, reject) => {
		Client.clients_id.findOne({ where: { uuid: request.params.uuid }, include: [Client.clients_addr, Client.clients_care, Client.clients_physio, Client.clients_scans, Client.clients_benef] }) //
			.then(client => {
				resolve(client)
			})
			.catch(err => { reject('Error: ' + err) })
	})
	return promise

}

const createClient = (client) => {
	const promise = new Promise((resolve, reject) => {
		console.log(client)

		const uuid = uuidv4()

		var error = false
		if (client.nir == '') {
			reject({ error: 'Bad Data' })
		} else {
			let clientObj = client

			// Set values automatically
			clientObj.id.uuid = uuid
			clientObj.id.birthDate.toString()
			clientObj.id.viewAt = new Date()

			Client.clients_id.create(clientObj.id)
				.then(res => { 
					console.log(res)

				})
				.catch(err => {
					console.log(err)
					error = true
				})
			
			clientObj.addr.uuid = uuid
			clientObj.addr.validity = '2021-08-29'
			Client.clients_addr.create(clientObj.addr)
				.then(res => {  })
				.catch(err => {
					console.log(err)
					error = true
				})

			clientObj.care.uuid = uuid
			clientObj.care.insurance = 0
			clientObj.care.begExo = '2021-08-29'
			clientObj.care.endExo = '2021-08-29'
			clientObj.care.begRights = '2021-08-29'
			clientObj.care.endRights = '2021-08-29'
			Client.clients_care.create(clientObj.care)
				.then(res => {  })
				.catch(err => {
					console.log(err)
					error = true
				})

			clientObj.physio.uuid = uuid
			Client.clients_physio.create(clientObj.physio)
				.then(res => {  })
				.catch(err => {
					console.log(err)
					error = true
				})

			// clientObj.scans.uuid = uuid
			// Client.clients_scans.create(clientObj.scans)
			// 	.then(res => {  })
			// 	.catch(err => {
			// 		console.log(err)
			// 		error = true
			// 	})

			// clientObj.benef.uuid = uuid
			// Client.clients_benef.create(clientObj.benef)
			// 	.then(res => {  })
			// 	.catch(err => {
			// 		console.log(err)
			// 		error = true
			// 	})
		}
		if ( error ) reject()
		else resolve()
	})

	return promise

}

const updateClient = (client) => {
	const promise = new Promise((resolve, reject) => {
		if (!req.body) {
			res.status(400)
			res.json({
				error: 'Bad Data'
			})
		} else {
			Client.clients.update(
				req.body,
				{ where: { uuid: req.params.uuid } }
			)
				.then(() => { res.send('Task Updated') })
				.catch(err => res.send(err))
		}
	})
	return promise
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
}

const updateLastViewClient = () => {
	const promise = new Promise((resolve, reject) => {


	})
	return promise
}

const deactivateClient = () => {
	const promise = new Promise((resolve, reject) => {


	})
	return promise
}

module.exports = {
	getClients,
	getClient,
	searchClients,
	createClient,
	updateClient,
	updateLastViewClient,
	deactivateClient
}