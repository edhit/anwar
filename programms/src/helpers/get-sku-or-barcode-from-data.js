const is_number = require("is-number")

exports.getSkuOrBarcodeFromData = async function(data, letter) {
	let result = []
	for (const value of data[Object.keys(data)[0]]) { // получаем первую страницу Object.keys(a)[0]
		if (is_number(value[letter])) {
			result.push(value[letter])
		}
	}

	return result
}