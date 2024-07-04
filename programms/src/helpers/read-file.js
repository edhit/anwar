const excelToJson = require('convert-excel-to-json');
const logger = require('./logger');

exports.readFile = async function(path) {
	try {
		let sourceFile = path
		if (path.split('/')[0] === "web") {
			sourceFile =  __dirname + '/../../../' + path
		}
		return excelToJson({
			sourceFile: sourceFile,
		});
	} catch (error) {
		logger.error(error)
	}
}