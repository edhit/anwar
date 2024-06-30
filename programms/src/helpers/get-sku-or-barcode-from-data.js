const is_number = require("is-number")
const logger = require("./logger")

exports.getSkuOrBarcodeFromData = async function(data, letter) {
	try {
		let result = []
		for (const value of data[Object.keys(data)[0]]) { // получаем первую страницу Object.keys(a)[0]
			if (is_number(value[letter])) {
				result.push(value[letter])
			}
		}
	
		return result
	} catch (error) {
		logger.error(error)
	}
}