const is_number = require("is-number")
const logger = require("./logger")

// data - данные из загруженного файла постовщика
// price - столбец с ценами в файле постовщика
// letter - стобец с (sku и/или barcode) в файле поставщика

exports.getPriceFromData = async function(data, price, letter) { 
	try {
		let result = []
		for (const value of data[Object.keys(data)[0]]) { // получаем первую страницу Object.keys(a)[0]
			if (is_number(value[price]) && value[letter]) {
				result.push({
					code: value[letter], // этот парамметр нужно добавлять всегда, если создается похожий файл
					price_vendor: value[price]
				})
			}
		}
	
		return result
	} catch (error) {
		logger.error(error)
	}
}