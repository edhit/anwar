const excelToJson = require('convert-excel-to-json');
const logger = require('./logger');

exports.readFile = async function(path) {
	try {
		return excelToJson({
			sourceFile: __dirname + '/../../../' + path,
		});
	} catch (error) {
		logger.error(error)
	}
}