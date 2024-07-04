// const logger = require("./logger")

exports.tableForExcelFromYandex = async function(product, value, data = "") {
    // try {
        let result = {
            sku: product.sku,
            title: product.title,
            barcode: value,
            link: product.link,
            rate: product.model.preciseRating,
            opinion: product.model.opinions,
            price_yandex: product.model.prices.min
        }
        
        if (data) {
            const find = data.find(({ code }) => code === value) 
    
            if (find) {
                for (const value of Object.keys(find)) {
                    if (value !== 'code') {
                        result[value] = find[value]
                    }
                }
            }
        }

        return result
    // } catch (error) {
    //     logger.error(error)
    // }
}