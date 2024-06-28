const { getSkuOrBarcodeFromData } = require('./helpers/get-sku-or-barcode-from-data')
const { readFile } = require('./helpers/read-file')
const logger = require('./helpers/logger');
const { getProductBySkuOrBarcode } = require('./helpers/get-product-by-sku-or-barcode');
const is_number = require('is-number');
const { tableForExcel } = require('./helpers/table-for-excel');
const { jsonToEcxel } = require('./helpers/json-to-excel');

exports.init = async(params, db) => {
	try {
		const yandex_account = await db.get('SELECT * FROM yandexes');
		if (!yandex_account) logger.error('NO DATA YANDEX')
	
		const path_file = params[0]
		const letter = params[1]
		const type = params[2]
		const rate = params[3]
		const file = params[4]
	
		const data_file = await readFile(path_file)
	
		const data_sku = await getSkuOrBarcodeFromData(data_file, letter)
		// ОСНОВНАЯ ПРОГРАММА //
		let result = []
		let i = 0
		if (is_number(rate)) {
			for (const value of data_sku) {
				i++ 
				logger.info(`${type}: ${value} | ON THE WAY: ${i}/${data_sku.length}`)
				let product = await getProductBySkuOrBarcode(value, yandex_account)
				try {
					if (product.length > 1) {
						for (let index = 0; index < product.length; index++) {
							if (product && product[index].model && product[index].model.preciseRating && product[index].model.preciseRating >= rate) {
								result.push(await tableForExcel(product[index], value))
							}						
						}
					} else {
						if (product && product[0].model && product[0].model.preciseRating && product[0].model.preciseRating >= rate) {
							result.push(await tableForExcel(product[0], value))	
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