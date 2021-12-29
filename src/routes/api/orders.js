const express = require('express')
const router = express.Router()

// const Order = include('models/Order')

// Get orders
router.get('/orders', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	// Order.findAll()
	// 	.then(orders => { res.json(orders) })
	// 	.catch(err => { res.send('Error: ' + err) })
})

// Add Client
router.post('/orders', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	// if (!req.body.numSS) {
	// 	res.status(400)
	// 	res.json({ error: 'Bad Data' })
	// } else {
	// 	Order.create(req.body)
	// 		.then(() => { res.send('Order added') })
	// 		.catch(err => { res.send('error: ' + err) })
	// }
})

// Get Client
router.get('/orders/:id', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	// Client.findByPk(req.params.uuid)
	// 	.then(client => { res.json(client) })
	// 	.catch(err => { res.send('Error: ' + err) })
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
// });

// Update Client
router.put('/orders/:id', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	// if (!req.body.numSS) {
	// 	res.status(400)
	// 	res.json({
	// 		error: 'Bad Data'
	// 	})
	// } else {
	// 	Client.update(
	// 		req.body,
	// 		{ where: { uuid: req.params.uuid } }
	// 	)
	// 		.then(() => { res.send('Task Updated') })
	// 		.error(err => res.send(err))
	// }
})

module.exports = router