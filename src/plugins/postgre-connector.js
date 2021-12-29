const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_SQL_NAME, process.env.DB_SQL_USER, process.env.DB_SQL_PASSWORD, {
	host: process.env.DB_SQL_HOST,
	dialect: process.env.DB_SQL_CLIENT,
	logging: false,
	dialectOptions: {
		connectTimeout: 0
	},
	operatorsAliases: 0,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

const dbG = {}
dbG.sequelize = sequelize
dbG.Sequelize = Sequelize

sequelize.sync({ alter: true })		// Synchronize models with DB

module.exports = dbG