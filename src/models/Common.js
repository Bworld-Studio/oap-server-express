const Sequelize = require('sequelize')
const dbG = include('plugins/postgre-connector')

const updates_logs = dbG.sequelize.define('updates_logs', { // eslint-disable-line no-alert, no-unused-vars
	file: { type: Sequelize.TEXT, primaryKey: true },
	timestamp: { type: Sequelize.DATEONLY },
}, {
	freezeTableName: true
})

module.exports = {
	updates_logs
}