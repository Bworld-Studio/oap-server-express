// const Sequelize = require('sequelize')	// Importation de Sequelize
// const dbG = require('../plugins/postgre-connector')		// Importaion des paramètres de la BD

// // Table unique
// const template = dbG.sequelize.define('ordersH', {
// 	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
// 	orderDate: { type: Sequelize.DATEONLY },
// 	providerID: { type: Sequelize.UUID },
// 	shipping: { type: Sequelize.DECIMAL(10, 2) }
// }, {
// 	freezeTableName: true
// })

// // Template si le modèle est constitué de deux tables (ex: en-tête et postes comme les factures )
// // Table 1
// const templateH = dbG.sequelize.define('templateH', {
// 	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
// 	orderDate: { type: Sequelize.DATEONLY },
// 	providerID: { type: Sequelize.UUID },
// 	shipping: { type: Sequelize.DECIMAL(10, 2) }
// }, {
// 	freezeTableName: true
// })

// // Table 2 si le modèle se compose de plusieurs tables (ex: en-tête et postes comme les factures )
// const templateP = dbG.sequelize.define('templateP', {
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

// // Exportation du modèle
// module.exports = {
// 	template,
// 	templateH,
// 	templateP
// }