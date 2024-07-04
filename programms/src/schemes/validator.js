const fs = require('fs');
const Validator = require('jsonschema').Validator;
const valid = require('validator');


Validator.prototype.customFormats.fileExist = function(input) {
    return (fs.existsSync(`${__dirname}/../../../${input}`))
};

Validator.prototype.customFormats.isAlpha = function(input) {
    return (valid.isAlpha(input))
};

Validator.prototype.customFormats.isAlphanumeric = function(input) {
    return (valid.isAlphanumeric(input))
};

Validator.prototype.customFormats.arrayNotEmpty = function(input) {
    return (input.length > 0)
};

module.exports = new Validator();