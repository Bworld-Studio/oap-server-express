/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()

// const productsService = include('services/products')

const { Op } = require('sequelize')

const BDPM = include('models/BDPM')

// Get all Products
router.get('/products', (req, res) => {
	let search = req.query.search
	if ( search != undefined ) {	// Search API
		let query = {}
		if ( isNaN(search) ) { 			// Query with ID
			query = {
				labelMed: { [Op.like]: search + '%' }
			}
		} else {
			query = {
				cis: search
			}
		}
		BDPM.bdpm_cis.findAll( { where: query })
			.then(products => {
				res.json(products) })
			// deepcode ignore XSS: <please specify a reason of ignoring this>, deepcode ignore XSS: <please specify a reason of ignoring this>
   .catch(err => { res.send('Error: ' + err) })
	}
	else {
		BDPM.bdpm_cis.findAll()
			.then(products => { res.json(products) })
			.catch(err => { res.send('Error: ' + err) })
	}

})
// Get from product
router.get('/products/:cis', (req, res) => {
	BDPM.bdpm_cis
		.findByPk(req.params.cis)
		// .findOne({ where: {cis: req.body.cis},})
		.then(product => { res.json(product) })
		// deepcode ignore XSS: <please specify a reason of ignoring this>
  .catch(err => { res.send('Error: ' + err) })
})

// Add Product
router.post('/products', (req, res) => {
	if (!req.body.numSS) {
		res.status(400)
		res.json({ error: 'Bad Data' })
	} else {
		BDPM
			.create(req.body).then(() => { res.send('Product Added')})
			.catch(err => { res.send('error: ' + err) })
	}
})

router.get('/products/notice/:cis', (req, res) => {
	res.json(req.params)
	// BDPM.bdpm_cis
	// 	.findByPk(req.params.cis)
	// 	// .findOne({ where: {cis: req.body.cis},})
	// 	.then(product => { res.json(product) })
	// 	.catch(err => { res.send('Error: ' + err) })
})


// Delete Product
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

// Update Product
router.put('/products/:cip', (req, res) => {
	if (!req.body.cip) {
		res.status(400)
		res.json({
			error: 'Bad Data'
		})
	} else {
		BDPM.update(
			req.body,
			{ where: { uuid: req.params.cip } }
		)
			.then(() => {
				res.send('Product updated')
			// deepcode ignore XSS: <please specify a reason of ignoring this>
   })
			.error(err => res.send(err))
	}
})

module.exports = router