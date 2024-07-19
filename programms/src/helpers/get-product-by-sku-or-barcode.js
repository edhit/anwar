const axios = require('axios');
const logger = require("./logger")

const getProductFromYandexBySku =  (process.env.getProductFromYandexBySku) ? process.env.getProductFromYandexBySku : "https://partner.market.yandex.ru/api/fulfillment/search-market-sku"

exports.getProductBySkuOrBarcode = async (id, yandex_account) => {
    try {
        const options = {
            method: "GET",
            url: getProductFromYandexBySku,
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

        return data
    } catch (error) {
        logger.error(error)
    }
}