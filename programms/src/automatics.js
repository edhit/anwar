const validator = require("validator");
const Brkill = require("browser-kill");
const { delay } = require("./helpers/delay");
const {
	getSkuOrBarcodeFromData,
} = require("./helpers/get-sku-or-barcode-from-data");
const { jsonToEcxel } = require("./helpers/json-to-excel");
const logger = require("./helpers/logger");
const {
	getHtmlCodeFromPage,
} = require("./helpers/page/get-html-code-from-page");
const { readFile } = require("./helpers/read-file");
const { deleteVendors } = require("./helpers/page/actions/delete-vendors");
const { keyboard, Key } = require("@nut-tree-fork/nut-js");
const { getParams } = require("./helpers/get-params");
// const { validate } = require("./helpers/validate");
// const template = require("./schemes/automatic");
// await validate(Object.keys(template.properties), params, "automatic");

const sku_letter = process.env.sku_letter ? process.env.sku_letter : "A";
const link_letter = process.env.link_letter ? process.env.link_letter : "D";
const open_page = process.env.open_page
	? process.env.open_page
	: "https://google.com";

const isYandexMarketPage = process.env.isYandexMarketPage
	? process.env.isYandexMarketPage
	: 'html[data-baobab-name="$page"]';

exports.init = async (params, db) => {
	try {
		const store = await getParams(params[0], params[1]);

		const path_file = store.path_file;
		const deleteVendorData = store.deleteVendorData;
		const file = store.new_file;

		const data_file = await readFile(path_file); // читаем файл постовщика
		const data_sku = await getSkuOrBarcodeFromData(data_file, sku_letter);
		const sheet = Object.keys(data_file)[0];

		// ОСНОВНАЯ ПРОГРАММА //
		let result = [];
		for (let index = 0; index < data_sku.length; index++) {
			logger.info(
				`SKU: ${data_file[sheet][index][sku_letter]} | ON THE WAY: ${index}/${data_sku.length} | SAVED: ${result.length}`
			);
			let flag = false;
			try {
				// console.log(data_file[sheet][index][link_letter]);

				await keyboard.releaseKey(Key.LeftControl);
				if (index % 5 === 0 || index === 0) {
					if (index !== 0) {
						await Brkill.chrome();
						await delay(2000);
					}

					require("child_process").exec(`start ${open_page}`);
					await delay(2000);
				}

				if (validator.isURL(data_file[sheet][index][link_letter])) {
					const html = await getHtmlCodeFromPage(
						data_file[sheet][index][link_letter],
						isYandexMarketPage
					);

					if (deleteVendorData.length > 0) {
						flag = await deleteVendors(
							html,
							isYandexMarketPage,
							deleteVendorData
						);
					}

					if (flag) {
						result.push(data_file[sheet][index]);
					}
				}

				if (result) {
					jsonToEcxel(result, file);
				}
			} catch (error) {
				logger.error(
					`SKU: ${data_file[sheet][index][sku_letter]} DIDN'T ADD IN THE LIST`
				);
			}
		}
		// КОНЕЦ ОСНОВНОЙ ПРОГРАММЫ //
	} catch (error) {
		logger.error(error);
	}
};
