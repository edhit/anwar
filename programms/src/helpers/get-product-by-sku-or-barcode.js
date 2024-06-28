const axios = require('axios');
const logger = require("./logger")

exports.getProductBySkuOrBarcode = async (id, yandex_account) => {
    try {
        const options = {
            method: "GET",
            url: "https://partner.market.yandex.ru/api/fulfillment/search-market-sku",
            responseType: "json",
            headers: {
                "sk": yandex_account.sk.trim(),
                "Cookie": yandex_account.cookie.trim()
            },
            charset: "utf8",
            responseEncodig: "utf8",
            params: {
                businessId: yandex_account.businessid.trim(),
                marketSku: id,
                page: 1
            }
        }

        let request = await axios.request(options)
        let data = request.data.data.result

        // logger.info(data)
        return data
    } catch (error) {
        logger.error(error)
    }
}