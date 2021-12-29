const express = require('express')
const router = express.Router()

const Template = include('models/Template')

// Récupérer tous les enregistrements ou uniquement correspondant à une requête
router.get('/template', (req, res) => {
	let value = req.body['field'] // Contient la valeur recherchée
	Template.findAll(
		{ where: { field: value }} // Filter champs: valeur à remonter
	)
		.then(table => {	// Le résultat de la requête est une liste dans la table

			res.json(table) // Transfert in JSON to UI
		})
		.catch(err => { res.send('Error: ' + err) })
})

// Récupérer un seul enregistrement grâce à la clé primaire
router.get('/template/:id', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	Template.findByPk(req.params.id)
		.then(item => {

			res.json(item)	// Transfert en JSON vers l'UI
		})
		.catch(err => { res.send('Error: ' + err) })
})

// Add Client
router.post('/template', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	if (!req.body.numSS) {
		res.status(400)
		res.json({ error: 'Bad Data' })
	} else {
		Template.create(req.body)
			.then(() => { res.send('Order added') })
			.catch(err => { res.send('error: ' + err) })
	}
})

// Delete Client
router.delete('/clients/:uuid', (req, res) => {
	Template.destroy({
		where: {
			uuid: req.params.uuid
		}
	})
		.then(() => {
			res.send('Client deleted')
		})
		.catch(err => {
			res.send('Error: ' + err)
		})
})

// Update Client
router.put('/template/:id', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	if (!req.body.numSS) {
		res.status(400)
		res.json({
			error: 'Bad Data'
		})
	} else {
		Template.update(
			req.body,
			{ where: { uuid: req.params.uuid } }
		)
			.then(() => { res.send('Task Updated') })
			.error(err => res.send(err))
	}
})

module.exports = router