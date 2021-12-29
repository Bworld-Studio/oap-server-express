const Sequelize = require('sequelize')
const dbG = include('plugins/postgre-connector')

const bdpm_cis = dbG.sequelize.define('bdpm_cis', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER, primaryKey: true },
	labelMed: { type: Sequelize.TEXT },
	pharmaForm: { type: Sequelize.STRING },
	medRoute: { type: Sequelize.STRING },
	adminStatus: { type: Sequelize.STRING(30) },
	procedureType: { type: Sequelize.STRING(50) },
	commercialState: { type: Sequelize.STRING(20) },
	aamDate: { type: Sequelize.DATEONLY },
	bdmStatus: { type: Sequelize.STRING },
	numEUAuth: { type: Sequelize.STRING },
	holder: { type: Sequelize.STRING },
	reinforcedMonitoring: { type: Sequelize.STRING }
}, {
	freezeTableName: true
})

const bdpm_cip = dbG.sequelize.define('bdpm_cip', { // eslint-disable-line no-alert, no-unused-vars
	cip7: { type: Sequelize.INTEGER, primaryKey: true },
	cip13: { type: Sequelize.BIGINT },
	cis: { type: Sequelize.INTEGER },
	label: { type: Sequelize.TEXT },
	adminStatus: { type: Sequelize.STRING(30) },
	commercialState: { type: Sequelize.STRING(100) },
	commercialDate: { type: Sequelize.DATEONLY },
	reimbursementRate: { type: Sequelize.SMALLINT },
	priceTTC: { type: Sequelize.DECIMAL(10, 2) },
	reimbursementAmount: { type: Sequelize.DECIMAL(10, 2) },
	priceHD: { type: Sequelize.DECIMAL(10, 2) },
	reimbursementText: { type: Sequelize.TEXT }
}, {
	freezeTableName: true
})

const bdpm_compo = dbG.sequelize.define('bdpm_compo', { // eslint-disable-line no-alert, no-unused-vars
	id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true },
	cis: { type: Sequelize.INTEGER },
	label: { type: Sequelize.TEXT },
	substanceID: { type: Sequelize.INTEGER },
	substanceLabel: { type: Sequelize.TEXT },
	substanceDosage: { type: Sequelize.TEXT },
	reference: { type: Sequelize.STRING },
	nature: { type: Sequelize.STRING(2) },
	natureID: { type: Sequelize.SMALLINT },
}, {
	freezeTableName: true
})

const bdpm_gener = dbG.sequelize.define('bdpm_gener', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER, primaryKey: true },
	id: { type: Sequelize.SMALLINT, primaryKey: true },
	label: { type: Sequelize.TEXT },
	type: { type: Sequelize.SMALLINT },
	sort: { type: Sequelize.SMALLINT },
}, {
	freezeTableName: true
})

const bdpm_cpd = dbG.sequelize.define('bdpm_cpd', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER, primaryKey: true },
	condition: { type: Sequelize.STRING(1000), primaryKey: true },
}, {
	freezeTableName: true
})


module.exports = {
	bdpm_cis,
	bdpm_cip,
	bdpm_compo,
	bdpm_gener,
	bdpm_cpd,
}