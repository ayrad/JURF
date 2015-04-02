// Dependencies load
var express = require('express'),
	app = express(),
	fs = require('fs'),
	request = require('request'),
	bodyParser = require('body-parser'),
	apicache = require('apicache').options({ debug: true }).middleware;

app.use(bodyParser.json());

// Load config.json
var config = JSON.parse(fs.readFileSync('./config.json'));
//console.log(config.apikey);

// HTTP listener
app.use(express.static(__dirname + '/public'));
app.listen(1337);
console.log('Server running on port 1337');

// Party starts here :)