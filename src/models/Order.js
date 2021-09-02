// const Sequelize = require('sequelize')
// const dbG = require('../plugins/postgre-connector')

// const ordersH = dbG.sequelize.define('ordersH', { // eslint-disable-line no-alert, no-unused-vars
// 	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
// 	orderDate: { type: Sequelize.DATEONLY },
// 	providerID: { type: Sequelize.UUID },
// 	shipping: { type: Sequelize.DECIMAL(10, 2) }
// }, {
// 	freezeTableName: true
// })

// const ordersP = dbG.sequelize.define('ordersP', {
// 	id: { type: Sequelize.INTEGER, primaryKey: true },
// 	cis: { type: Sequelize.INTEGER, primaryKey: true },
// 	quantity: { type: Sequelize.INTEGER },
// 	priceCat: { type: Sequelize.DECIMAL(10, 2) },
// 	discount: { type: Sequelize.DECIMAL(10, 2) },
// 	priceDis: { type: Sequelize.DECIMAL(10, 2) },
// 	VAT: { type: Sequelize.DECIMAL(10, 2) },
// 	markRate: { type: Sequelize.DECIMAL(10, 2) },
// 	sellPrice: { type: Sequelize.DECIMAL(10, 2) }
// }, {
// 	freezeTableName: true
// })

// module.exports = {
// ordersH,
// ordersP
// }