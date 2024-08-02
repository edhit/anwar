const { getParams } = require("./helpers/get-params");
const {
	getSkuOrBarcodeFromData,
} = require("./helpers/get-sku-or-barcode-from-data");
const { jsonToEcxel } = require("./helpers/json-to-excel");
const logger = require("./helpers/logger");
const { readFile } = require("./helpers/read-file");
// const { validate } = require('./helpers/validate');
// const template = require('./schemes/stopwords');
// await validate(Object.keys(template.properties), new_params, 'stopwords')

const sku_letter = process.env.sku_letter ? process.env.sku_letter : "A";
const name_letter = process.env.name_letter ? process.env.name_letter : "B";

exports.init = async (params) => {
	try {
		const store = await getParams(params[0], params[1]);

		const path_file = store.path_file;
		const words = store.words;
		const file = store.new_file;

		const data_file = await readFile(path_file);
		const data_sku = await getSkuOrBarcodeFromData(data_file, sku_letter);
		const sheet = Object.keys(data_file)[0];

		// ОСНОВНАЯ ПРОГРАММА //
		let result = [];
		let flag;
		for (let index = 0; index < data_sku.length; index++) {
			logger.info(
				`SKU: ${data_file[sheet][index][sku_letter]} | ON THE WAY: ${index}/${data_sku.length} | SAVED: ${result.length}`
			);
			try {
				flag = true;
				for (const value of words) {
					if (
						data_file[sheet][index][name_letter]
							.toUpperCase()
							.search(value.replace("_", " ").toUpperCase()) !==
							-1 &&
						flag
					) {
						flag = false;
					}
				}
				if (flag) {
					result.push(data_file[sheet][index]);
				}
			} catch (error) {
				logger.error(
					`SKU: ${data_file[sheet][index][sku_letter]} DIDN'T ADD IN THE LIST`
				);
			}
		}
		// КОНЕЦ ОСНОВНОЙ ПРОГРАММЫ //

		if (result) {
			jsonToEcxel(result, file);
		}
	} catch (error) {
		logger.error(error);
	}
};
