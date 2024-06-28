const sqlite3 = require('sqlite3')
const {open} = require('sqlite');
const logger = require('./src/helpers/logger');

process.argv.forEach(function (val, index, array) {
	try {
		(async () => {
			const db = await open({
			  filename: __dirname + '/../web/tmp/db.sqlite3',
			  driver: sqlite3.Database
			})
	
			if (index === 2) {		
				const { init } = require('./src/' + val);
				
				init(array.slice(3), db)		
			}
		})()
	} catch (error) {
		logger.error(error)
	}
});

