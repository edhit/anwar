const validator = require('validator');
const { delay } = require("./helpers/delay");
const { getSkuOrBarcodeFromData } = require("./helpers/get-sku-or-barcode-from-data");
const { jsonToEcxel } = require("./helpers/json-to-excel");
const logger = require("./helpers/logger");
const { getHtmlCodeFromYandex } = require("./helpers/nut/get-html-code-from-yandex");
const { readFile } = require('./helpers/read-file')
const { validate } = require('./helpers/validate');
const template = require('./schemes/automatic');


// node index automatic path [action] file_name

const sku_letter = "A"
const link_letter = "D"
const open_page = "https://google.com"

exports.init = async(params, db) => {
	try {  
        let new_params = []
		new_params[0] = params[0]
        new_params[1] = params.slice(1, params.length - 1).join(" ").slice(1).slice(0, -1).split(',')
        new_params[2] = params[params.length - 1]

        await validate(Object.keys(template.properties), new_params, 'automatic')
        console.log(new_params);
        return

		const path_file = new_params[0]
        const actions = new_params[1]
        const file = new_params[2]
	
		const data_file = await readFile(path_file) // читаем файл постовщика
        const data_sku = await getSkuOrBarcodeFromData(data_file, sku_letter)
        const sheet = Object.keys(data_file)[0]
		
		// ОСНОВНАЯ ПРОГРАММА //
        require('child_process').exec(`start ${open_page}`);
        
        delay(10000)

		let result = []
        for (let index = 0; index < data_sku.length; index++) {
            logger.info(`SKU: ${data_sku[index]} | ON THE WAY: ${index}/${data_sku.length} | SAVED: ${result.length}`)
			try {
                // console.log(data_file[sheet][index][link_letter]);
                if (validator.isURL(data_file[sheet][index][link_letter])) {
                    await getHtmlCodeFromYandex(data_file[sheet][index][link_letter])
                }
			} catch (error) {
                logger.error(`SKU: ${data_sku[index]} DIDN'T ADD IN THE LIST`)
			}
		}
		// КОНЕЦ ОСНОВНОЙ ПРОГРАММЫ //

		if (result) {
			jsonToEcxel(result, file)
		}
	} catch (error) {
		logger.error(error)
	}
}