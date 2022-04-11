 const express = require('express')
const pjson = require('../package.json')
const dotenv = require('dotenv')
// const https = require('https')
const http = require('http')
// const fs = require('fs')

const app = express()	// Application creation

dotenv.config()

// CORS
const cors = require('cors')
const corsOptions = { origin: 'http://localhost:3000' }
app.use(cors(corsOptions))

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Absolute paths
global.base_dir = __dirname // eslint-disable-line no-undef
global.abs_path = function(path) {
	return base_dir + path // eslint-disable-line no-undef
}
global.include = function(file) {
	return require(abs_path('/' + file)) // eslint-disable-line no-undef
}

// Declare routes
include('routes/routes')(app)

const httpServer = http.createServer(app)

httpServer.listen(process.env.APP_PORT_HTTP, () => {
	console.log( pjson.name + '@' + pjson.version + ' running on port ' + process.env.APP_PORT_HTTP)
})

// HTTPS
// const options = {
// 	key: fs.readFileSync('./cert/localhost-key.pem'),
// 	cert: fs.readFileSync('./cert/localhost.pem'),
// 	ca: fs.readFileSync('C:\\Users\\grayf\\AppData\\Local\\mkcert\\rootCA.pem'),
// }

// const httpsServer = https.createServer(options, app)

// httpsServer.listen(process.env.APP_PORT_HTTPS, () => {
// 	console.log( pjson.name + '@' + pjson.version + ' running on port ' + process.env.APP_PORT_HTTPS)
// })

// Start Server
// const port = 3443
// app.listen(port, function() {
// 	console.log( pjson.name + '@' + pjson.version + ' running on port ' + port)
// })

// const httpsServer = https.createServer(options, app)

// httpsServer.listen(port, () => {
// 	console.log( pjson.name + '@' + pjson.version + ' running on port ' + port)
// })