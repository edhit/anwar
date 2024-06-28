exports.tableForExcel = async function(product, value) {
    return {
        title: product.model.title,
        barcode: value,
        sku: product.sku,
        link: product.link,
        rate: product.model.preciseRating
    }
}