const toNumber = require("strnum");

exports.popularCondition = async function(product, condition) {
    // console.log(product);
    console.log(condition.rate);
    return (
        product && 
        product[condition.index] &&
        product[condition.index].model && 
        product[condition.index].model.preciseRating && 
        product[condition.index].model.preciseRating >= toNumber(condition.rate) && 
        product[condition.index].model.opinions && 
        product[condition.index].model.opinions >= toNumber(condition.opinion) &&
        product[condition.index].model.prices &&
        product[condition.index].model.prices.min
    ) ? true : false
}