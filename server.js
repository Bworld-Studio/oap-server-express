var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
var corsOptions = { origin: "http://localhost:3000" };

var app = express();	// Application creation

app.use(cors(corsOptions));

app.use(bodyParser.json());	// Parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));	// Parse requests of content-type - application/x-www-form-urlencoded

var clients = require('./routes/clients');
app.use("/api", clients);

var labels = require('./routes/labels');
app.use("/api", labels);

// Set port, listen for requests
const port = 3000;
app.listen(port, function() {
	console.log('Server started on port ' + port);
});