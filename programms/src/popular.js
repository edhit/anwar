const { getSkuOrBarcodeFromData } = require('./helpers/get-sku-or-barcode-from-data')
const { readFile } = require('./helpers/read-file')
const logger = require('./helpers/logger');
const { getProductBySkuOrBarcode } = require('./helpers/get-product-by-sku-or-barcode');
const is_number = require('is-number');
const { tableForExcelFromYandex } = require('./helpers/table-for-excel');
const { jsonToEcxel } = require('./helpers/json-to-excel');
const { getPriceFromData } = require('./helpers/get-price-from-data');
const { validate } = require('./helpers/validate');
const template = require('./schemes/popular');
// opinions - отзывы всего
// ratingCount - оценка всех продавцов

// function template() {
// 	return ['path_file', 'letter', 'price', 'type', 'opinion', 'rate', 'file', 'yandex']
// }

exports.init = async(params, db) => {
	try {
		const yandex = await db.get('SELECT * FROM yandexes');
		if (!yandex) return logger.error('NO DATA YANDEX')
		params.push(yandex)

		await validate(Object.keys(template.properties), params, 'popular')
 
		const path_file = params[0]
		const letter = params[1]
		const price = params[2].toUpperCase() 
		const type = params[3].toUpperCase()
		const opinion = params[4]
		const rate = params[5]
		const file = params[6]
	
		const data_file = await readFile(path_file) // читаем файл постовщика
		const data_sku = await getSkuOrBarcodeFromData(data_file, letter) // получаем (sku и/или barcode) из файла поставщика а
		const data_price = await getPriceFromData(data_file, price, letter) // получаем цены к (sku и/или barcode) из файла поставщика в ввиде массива 
		
		// ОСНОВНАЯ ПРОГРАММА //
		let result = []
		let i = 0
		if (is_number(rate)) {
			for (const value of data_sku) {
				i++ 
				logger.info(`${type}: ${value} | ON THE WAY: ${i}/${data_sku.length} | SAVED: ${result.length}`)
				let product = await getProductBySkuOrBarcode(value, yandex)

				try {
					if (product.length > 1) {
						for (let index = 0; index < product.length; index++) {
							if ( // подключить из файла rules
								product &&
								product[index] && 
								product[index].model && 
								product[index].model.preciseRating && 
								product[index].model.preciseRating >= rate && 
								product[index].model.opinions && 
								product[index].model.opinions >= parseInt(opinion) &&
								product[index].model.prices &&
								product[index].model.prices.min
							) {
								result.push(await tableForExcelFromYandex(product[index], value, data_price))
							}						
						}
					} else {
						if (
							product && 
							product[0] && 
							product[0].model && 
							product[0].model.preciseRating && 
							product[0].model.preciseRating >= rate && 
							product[0].model.opinions && 
							product[0].model.opinions >= parseInt(opinion) &&
							product[0].model.prices &&
							product[0].model.prices.min
						) {
							result.push(await tableForExcelFromYandex(product[0], value, data_price))	
						}
					}
				} catch (error) {
					logger.error(`${type}: ${value} DIDN'T ADD IN THE LIST`)
				}
			}
		}
		// КОНЕЦ ОСНОВНОЙ ПРОГРАММЫ //

		jsonToEcxel(result, file)
	} catch (error) {
		logger.error(error)
	}
}