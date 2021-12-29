const Sequelize = require('sequelize')
const dbG = include('plugins/postgre-connector')

// Identification
const clients_id = dbG.sequelize.define('clients_id', {
	uuid: { type: Sequelize.UUID, primaryKey: true },
	lastName: { type: Sequelize.STRING },
	maidenName: { type: Sequelize.STRING },
	firstName: { type: Sequelize.STRING },
	birthDate: { type: Sequelize.DATEONLY },
	sex: { type: Sequelize.STRING(2) },
	birthRank: { type: Sequelize.STRING(2) },
	category: { type: Sequelize.STRING(3) },
	viewAt: { type: Sequelize.DATE },
	active: { type: Sequelize.BOOLEAN }
}, { freezeTableName: true })

// Address
const clients_addr = dbG.sequelize.define('clients_addr', {
	uuid: { type: Sequelize.UUID, primaryKey: true },
	validity: { type: Sequelize.DATEONLY, primaryKey: true },
	streetNumber: { type: Sequelize.STRING },
	address: { type: Sequelize.STRING },
	address2: { type: Sequelize.STRING },
	apptNumber: { type: Sequelize.STRING },
	floor: { type: Sequelize.STRING },
	city: { type: Sequelize.STRING },
	zipcode: { type: Sequelize.STRING },
	cellphone: { type: Sequelize.STRING },
	phone: { type: Sequelize.STRING },
	email: { type: Sequelize.STRING },
}, { freezeTableName: true })

// Prise en charge
const clients_care = dbG.sequelize.define('clients_care', {
	uuid: { type: Sequelize.UUID, primaryKey: true },
	nir: { type: Sequelize.DECIMAL(13, 0) },
	nirKey: { type: Sequelize.DECIMAL(2, 0) },
	RO: { type: Sequelize.STRING(10) },
	exos: { type: Sequelize.STRING(1) },
	begExo: { type: Sequelize.DATEONLY },
	endExo: { type: Sequelize.DATEONLY },
	risk: { type: Sequelize.STRING(1) },
	insurance: { type: Sequelize.DECIMAL(8, 0) },
	garanties: { type: Sequelize.TEXT },
	contract: { type: Sequelize.STRING },
	begRights: { type: Sequelize.DATEONLY },
	endRights: { type: Sequelize.DATEONLY },
}, { freezeTableName: true })

// Physio-pathologie
const clients_physio = dbG.sequelize.define('clients_physio', {
	uuid: { type: Sequelize.UUID, primaryKey: true },
	weight: { type: Sequelize.SMALLINT },
	size: { type: Sequelize.SMALLINT },
	mesures: { type: Sequelize.TEXT },
	allergies: { type: Sequelize.TEXT },
	historical: { type: Sequelize.TEXT },
}, { freezeTableName: true })

// Scans - Documents
const clients_scans = dbG.sequelize.define('clients_scans', {
	uuid: { type: Sequelize.UUID, primaryKey: true },
	type: { type: Sequelize.STRING(5), primaryKey: true },
	document: { type: Sequelize.JSONB, primaryKey: true },
}, { freezeTableName: true })

// Beneficiaries
const clients_benef = dbG.sequelize.define('clients_benef', {
	uuid: { type: Sequelize.UUID, primaryKey: true },
	buuid: { type: Sequelize.UUID, primaryKey: true },
}, { freezeTableName: true })

clients_id.hasMany(clients_addr, {
	targetKey: 'uuid',
	foreignKey: 'uuid'
})
clients_addr.belongsTo(clients_id, {
	targetKey: 'uuid',
	foreignKey: 'uuid'
})

clients_id.hasOne(clients_care, {
	targetKey: 'uuid',
	foreignKey: 'uuid'
})
clients_care.belongsTo(clients_id, {
	constraints: false,
	targetKey: 'uuid',
	foreignKey: 'uuid'
})

clients_id.hasMany(clients_physio, {
	targetKey: 'uuid',
	foreignKey: 'uuid'
})
clients_physio.belongsTo(clients_id, {
	constraints: false,
	targetKey: 'uuid',
	foreignKey: 'uuid'
})

clients_id.hasMany(clients_scans, {
	targetKey: 'uuid',
	foreignKey: 'uuid'
})

clients_scans.belongsTo(clients_id, {
	constraints: false,
	targetKey: 'uuid',
	foreignKey: 'uuid'
})

clients_id.hasMany(clients_benef, {
	targetKey: 'uuid',
	foreignKey: 'uuid'
})

clients_benef.belongsTo(clients_id, {
	constraints: false,
	targetKey: 'uuid',
	foreignKey: 'uuid'
})

module.exports = {
	clients_id,
	clients_addr,
	clients_care,
	clients_physio,
	clients_scans,
	clients_benef
}