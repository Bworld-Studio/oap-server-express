const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

const downloadFromURL = async (url, filename, folder) => {
	const path = Path.join(__dirname, folder, filename) // eslint-disable-line no-alert, no-undef
	const writer = Fs.createWriteStream(path)

	const response = await Axios({
		url,
		method: 'GET',
		responseType: 'stream'
	})

	response.data.pipe(writer)

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve)
		writer.on('error', reject)
	})
}

module.exports = {
	downloadFromURL
}