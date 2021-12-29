const urls = { // eslint-disable-line no-alert, no-unused-vars
	cis: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt',
	cip: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CIP_bdpm.txt',				// eslint-disable-line no-alert, no-unused-vars
	compo: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_COMPO_bdpm.txt',		// eslint-disable-line no-alert, no-unused-vars
	gener: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt',		// eslint-disable-line no-alert, no-unused-vars
	cpd: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CPD_bdpm.txt'					// eslint-disable-line no-alert, no-unused-vars
}

const files = [
	{ name: 'cis', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt', folder: '/bdpm/tmp'},
	{ name: 'cip', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CIP_bdpm.txt', folder: '/bdpm/tmp'},
	{ name: 'compo', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_COMPO_bdpm.txt', folder: '/bdpm/tmp'},
	{ name: 'gener', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt', folder: '/bdpm/tmp'},
	{ name: 'cpd', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CPD_bdpm.txt', folder: '/bdpm/tmp'}
]

const Fs = require('fs')
const Path = require('path')

// import Utils from ('../utils')
const { downloadFromURL } = include('exts/utils')

const BDPM = include('models/BDPM')
const Common = include('models/Common')

const uploadFileToDB = function(filename) {
	return new Promise((resolve, reject) => {
		let timestamp = new Date()
		Fs.readFile(Path.join(__dirname, 'tmp', filename), 'latin1', (err, data) => {	// eslint-disable-line no-alert, no-undef
			if (err) {
				console.log(filename+': file reed')
				return reject(err)
			}
			if (!err) console.log(filename+ ': upload file to database')
			let array = []

			// BDPM cis file -- OK
			if ( filename === 'cis' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) array.push(mappingCIS(rowArray))
				})
				BDPM.bdpm_cis.destroy({ truncate: true })
				BDPM.bdpm_cis.bulkCreate(array)
					.then(() => {
						console.log('CIS: update done')
						// BDPM.bdmp_updates.update({file: 'cis', timestamp: timestamp}).then().catch()
						resolve('CIS: update done')
					})
					.catch(err => { console.log('CIS: update error -->'+ err) })
				let update_log = {file: 'BDPM', timestamp: timestamp}
				Common.updates_logs.upsert(update_log).then( () => console.log('BDPM: Log Updated') ).catch( () => console.log('BDPM: Error updating the log'))
			}

			// CIP file -- OK
			if ( filename === 'cip' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) array.push(mappingCIP(rowArray))
				})
				BDPM.bdpm_cip.destroy({ truncate: true })
				BDPM.bdpm_cip.bulkCreate(array, { raw: true })
					.then(function() {
						console.log('CIP: update done')
						resolve('CIP: update done')
					})
					.catch(err => { console.log('CIP: update error --> '+ err) })
			}

			// BDPM compo file -- ok
			if ( filename === 'compo' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) array.push(mappingCOMPO(rowArray))
				})
				BDPM.bdpm_compo.destroy({ truncate: true })
				BDPM.bdpm_compo.bulkCreate(array, { raw: true })
					.then(function() {
						console.log('COMPO: update done')
						resolve('COMPO: update done')
					})
					.catch(err => { console.log('COMPO: update error --> '+ err) })
			}

			// BDPM gener file -- ok
			if ( filename === 'gener' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) array.push(mappingGENER(rowArray))
				})
				BDPM.bdpm_gener.destroy({ truncate: true })
				BDPM.bdpm_gener.bulkCreate(array, { raw: true })
					.then(function() {
						console.log('GENER: update done')
						resolve('GENER: update done')
					})
					.catch(err => { console.log('GENER: update error --> '+ err) })
			}

			// BDPM cpd file -- ok
			if ( filename === 'cpd' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) array.push(mappingCPD(rowArray))
				})
				BDPM.bdpm_cpd.destroy({ truncate: true })
				BDPM.bdpm_cpd.bulkCreate(array, { raw: true })
					.then(function() {
						console.log('CPD: update done')
						resolve('CPD: update done')
					})
					.catch(err => { console.log('CPD: update error --> '+ err) })
			}
		})
	})
}

// Mapping functions
const mappingCIS = function(line) {
	let mappedLine = {
		cis:									convertValue(line[0]),
		labelMed:							convertValue(line[1]),
		pharmaForm:						convertValue(line[2]),
		medRoute:							convertValue(line[3]),
		adminStatus:					convertValue(line[4]),
		procedureType:				convertValue(line[5]),
		commercialState:			convertValue(line[6]),
		aamDate:							convertDate(line[7]),
		bdmStatus:						convertValue(line[8]),
		numEUAuth:						convertValue(line[9]),
		holder:								convertValue(line[10]),
		reinforcedMonitoring:	convertValue(line[11]),
	}
	//eslint-disable-next-line no-undef
	return mappedLine
}

const mappingCIP = function(line) {
	let mappedLine = {
		cip7:									convertValue(line[1]),
		cip13:								convertValue(line[6]),
		cis:									convertValue(line[0]),
		label:								convertValue(line[2]),
		adminStatus:					convertValue(line[3]),
		commercialState:			convertValue(line[4]),
		commercialDate:				convertDate(line[5]),
		reimbursementRate:		convertNumber(line[8]),
		priceTTC:							convertAmount(line[9]),
		reimbursementAmount:	convertAmount(line[10]),
		priceHD:							convertAmount(line[11]),
		reimbursementText:		convertValue(line[12])
	}
	// eslint-disable-next-line no-undef
	return mappedLine
}

const mappingCOMPO = function(line) {
	let mappedLine = {
		cis:									convertValue(line[0]),
		label:								convertValue(line[1]),
		substanceID:					convertValue(line[2]),
		substanceDosage:			convertValue(line[4]),
		substanceLabel:				convertValue(line[3]),
		reference:						convertValue(line[5]),
		nature:								convertValue(line[6]),
		natureID:							convertValue(line[7])
	}
	return mappedLine
}
const mappingGENER = function(line) {
	let mappedLine = {
		id:										convertValue(line[0]),
		label:								convertValue(line[1]),
		cis:									convertValue(line[2]),
		type:									convertValue(line[3]),
		sort:									convertValue(line[4]),
	}
	return mappedLine
}
const mappingCPD = function(line) {
	let mappedLine = {
		cis:									convertValue(line[0]),
		condition:						convertValue(line[1]),
	}
	return mappedLine
}

// Conversion functions
const convertValue = function(p_val) {
	let value = p_val.trim()
	return value
}

const convertNumber = function(p_val) {
	let number = p_val.replace('%','').trim()
	if ( number == '' ) return null

	return number
}

const convertDate = function(p_date) {
	p_date.trim()
	let date = p_date.substring(6,10) + '-' + p_date.substring(3,5) + '-' + p_date.substring(0,2)
	return date
}

const convertAmount = function(p_amount) {
	if ( p_amount == '' ) return null

	let decimal = p_amount.substring( p_amount.length - 2, p_amount.length )
	let units = p_amount.substring(0, p_amount.length - 3 )
	units = units.replace(',','')

	let price = units+'.'+decimal
	return price
}

const updateFiles = async () => {

	try {
		for(var i=0; i<files.length; i++ ) {
			let file = files[i]
			// eslint-disable-next-line no-unused-vars
			const response = await downloadFromURL(file.url, file.name, file.folder)
			// const response = downloadFromURL(file.url, file.name, file.folder)
			console.log(response)
			// eslint-disable-next-line no-unused-vars
			const processed = await uploadFileToDB(file.name)
			console.log(processed)
		}
	}
	catch (err) {
		console.log(err)
		console.log('Error BDPM update')
	}
}

const readLastUpdateDate = async () => {
	return new Promise((resolve, reject) => {
		Common.updates_logs.findByPk('BDPM')
			.then(line => {
				resolve(line.dataValues.timestamp)
			})
			.catch(err => {
				reject('Error: ' + err)
			})
	})
}

module.exports = {
	updateFiles,
	readLastUpdateDate
}