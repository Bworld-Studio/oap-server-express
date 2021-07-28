/* eslint-disable no-unused-vars */

const { Op } = require('sequelize')
const Client = require('../../models/Client')

// Get all Clients
const getClients = (search) => {
	return new Promise((resolve, reject) => {
		if ( search != undefined ) {	// Search API
			let query = {
				[Op.or]: [
					{ numSS: { [Op.like]: search + '%' } },
					{ lastName: { [Op.like]: search + '%' } },
					{ firstName: { [Op.like]: search + '%' } }
				]
			}
			Client.clients.findAll( { where: query } )
				.then(clients => {
					resolve(clients)
				})
				.catch(err => { reject('Error: ' + err) })
		}
		else {
			Client.clients.findAll()
				.then(clients => {
					resolve(clients)
				})
				.catch(err => { reject('Error: ' + err) })
		}
	})
}

const searchClients = (search) => {
	return new Promise((resolve, reject) => {
		let query = {
			[Op.or]: [
				{ numSS: { [Op.like]: search + '%' } },
				{ lastName: { [Op.like]: search + '%' } },
				{ firstName: { [Op.like]: search + '%' } }
			]
		}
		Client.clients.findAll( { where: query } )
			.then(clients => {
				resolve(clients)
			})
			.catch(err => { reject('Error: ' + err) })
	})
}

// eslint-disable-next-line no-unused-vars
const getClient = (params) => {

	// Client.findByPk(params.uuid)
	// 	.then(client => { res.json(client) })
	// 	.catch(err => { res.send('Error: ' + err) })
}

const createClient = () => {

}

const updateClient = () => {

}

const updateLastViewClient = () => {

}

const deactivateClient = () => {

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