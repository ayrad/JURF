// # JURF Configuration file

var config = {
	// Host & Port where to listen for HTTP requests
	server: {
		host: '127.0.0.1', //Notice that if you leave this by default, you will be able to access the app only from local machine.
		port: '1337'
	},
	
	//MongoDB Database config
	database: {
		host: '127.0.0.1',
		port: '27017',
		name: 'urf',
		username: '',
		password: ''
	},
	
	//Riot Games API config
	api: {
		key: '',
		baseUrl: 'https://euw.api.pvp.net/api/lol/',
		baseUrlStatic: 'https://global.api.pvp.net/api/lol/static-data/'
	},
	
	//Cronjobs config
	cron: {
		running: false //true/false to enable/disable retrieving URF matches data from Riot Games API to local Database
	}
};

// Export config
module.exports = config;