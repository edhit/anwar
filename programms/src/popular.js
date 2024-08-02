const {
	getSkuOrBarcodeFromData,
} = require("./helpers/get-sku-or-barcode-from-data");
const { readFile } = require("./helpers/read-file");
const { getParams } = require("./helpers/get-params");
const logger = require("./helpers/logger");
const {
	getProductBySkuOrBarcode,
} = require("./helpers/get-product-by-sku-or-barcode");
const is_number = require("is-number");
const { tableForExcelFromYandex } = require("./helpers/table-for-excel");
const { jsonToEcxel } = require("./helpers/json-to-excel");
const { getPriceFromData } = require("./helpers/get-price-from-data");

// const { validate } = require("./helpers/validate");
// const template = require("./schemes/popular");
// await validate(Object.keys(template.properties), params, "popular");

exports.init = async (params) => {
	// opinions - отзывы всего
	// ratingCount - оценка всех продавцов
	try {
		const yandex = await getParams("yandex", "last");

		const store = await getParams(params[0], params[1]);

		const path_file = store.path_file;
		const letter = store.letter;
		const price = store.price;
		const type = store.type;
		const opinion = store.opinion;
		const rate = store.rate;
		const file = store.new_file;

		const data_file = await readFile(path_file); // читаем файл постовщика
		const data_sku = await getSkuOrBarcodeFromData(data_file, letter); // получаем (sku и/или barcode) из файла поставщика а
		const data_price = await getPriceFromData(data_file, price, letter); // получаем цены к (sku и/или barcode) из файла поставщика в ввиде массива

		// ОСНОВНАЯ ПРОГРАММА //
		let result = [];
		let i = 0;
		if (is_number(rate)) {
			for (const value of data_sku) {
				i++;
				logger.info(
					`${type}: ${value} | ON THE WAY: ${i}/${data_sku.length} | SAVED: ${result.length}`
				);
				let product = await getProductBySkuOrBarcode(value, yandex);

				try {
					if (product.length > 1) {
						for (let index = 0; index < product.length; index++) {
							if (
								product &&
								product[index] &&
								product[index].model &&
								product[index].model.preciseRating &&
								product[index].model.preciseRating >= rate &&
								product[index].model.opinions &&
								product[index].model.opinions >=
									parseInt(opinion) &&
								product[index].model.prices &&
								product[index].model.prices.min
							) {
								result.push(
									await tableForExcelFromYandex(
										product[index],
										value,
										data_price
									)
								);
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
							result.push(
								await tableForExcelFromYandex(
									product[0],
									value,
									data_price
								)
							);
						}
					}
				} catch (error) {
					logger.error(`${type}: ${value} DIDN'T ADD IN THE LIST`);
				}
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
