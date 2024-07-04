const { getSkuOrBarcodeFromData } = require("./helpers/get-sku-or-barcode-from-data");
const { jsonToEcxel } = require("./helpers/json-to-excel");
const logger = require("./helpers/logger");
const { readFile } = require('./helpers/read-file')
const { validate } = require('./helpers/validate');
const template = require('./schemes/stopwords');

exports.init = async(params, db) => {
    try {
        let new_params = []
		new_params[0] = params[0]
        new_params[1] = params.slice(1, params.length - 1).join(" ").slice(1).slice(0, -1).split(',')
        new_params[2] = params[params.length - 1]

        await validate(Object.keys(template.properties), new_params, 'stopwords')

		const path_file = new_params[0]
        const words = new_params[1]
        const file = new_params[2]

        const data_file = await readFile(path_file)
        const data_sku = await getSkuOrBarcodeFromData(data_file, "A")
        const sheet = Object.keys(data_file)[0]

    	// ОСНОВНАЯ ПРОГРАММА //
		let result = []
        let flag
        for (let index = 0; index < data_sku.length; index++) {
            logger.info(`SKU: ${data_sku[index]} | ON THE WAY: ${index}/${data_sku.length} | SAVED: ${result.length}`)
            try {
                flag = true
                for (const value of words) {
                   if (data_file[sheet][index].B.toUpperCase().search(value.replace("_", " ").toUpperCase()) !== -1 && flag) {
                        // console.log(data_file[sheet][index].B);
                        // console.log(value.replace("_", " "));
                        flag = false
                    }    
                }
                if (flag) {
                    result.push(data_file[sheet][index])
                }
            } catch (error) {
                logger.error(`SKU: ${data_sku[index]} DIDN'T ADD IN THE LIST`)
            }
        }

        jsonToEcxel(result, file)        
    } catch (error) {
		logger.error(error)
    }
}