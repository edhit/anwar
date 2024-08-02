const axios = require("axios");
const logger = require("./logger");

const getProductFromYandexBySku = process.env.getProductFromYandexBySku
	? process.env.getProductFromYandexBySku
	: "https://partner.market.yandex.ru/api/fulfillment/search-market-sku";

exports.getProductBySkuOrBarcode = async (id, yandex) => {
	try {
		const options = {
			method: "GET",
			url: getProductFromYandexBySku,
			responseType: "json",
			headers: {
				sk: yandex.sk.trim(),
				Cookie: yandex.cookie.trim(),
			},
			charset: "utf8",
			responseEncodig: "utf8",
			params: {
				businessId: yandex.businessid.trim(),
				marketSku: id,
				page: 1,
			},
		};

		let request = await axios.request(options);
		let data = request.data.data.result;

		return data;
	} catch (error) {
		logger.error(error);
	}
};
