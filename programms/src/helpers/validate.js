const isNumber = require('is-number');
const logger = require('./logger');
const validator = require('./../schemes/validator');
const {
    message
} = require('./../schemes/message');

exports.validate = async function(template = "", params = "", schema) {
    // console.log(template.length);
    // console.log(params.length);
    const flag = ['message', 'validator']
    if (template.length === params.length && !flag.includes(schema)) {
        const schema_js = require(`./../schemes/${schema}.js`)

        let data = []
        for (let index = 0; index < template.length; index++) {
            let value = (isNumber(params[index])) ? Number(params[index]) : params[index]
            data.push({
                key: template[index],
                value: value
            })
        }

        data = data.reduce((acc, cur) => ({
            ...acc,
            [cur.key]: cur.value
        }), {})

        const result = validator.validate(data, schema_js)

        if (result.valid) return
        else {
            for (const value of result.errors) {
                // console.log(value);
                logger.error(message(value.argument, value.property, value.stack))
            }
        }
    } else {
        // let dir_progrmm = __dirname.split('\\').slice(0, 4).join('\\')

        if (schema === "popular") {
            logger.error('node index automatic path letter_sku letter_price type opinion rate file_name')
        }
        if (schema === "stopwords") {
            logger.error("node index automatic path [stopwords] file_name")
        }
        if (schema === "automatic") {
            logger.error("node index automatic path letter_link type file_name")
        }
    }

    process.exit(0)
}