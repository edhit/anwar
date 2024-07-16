const fs = require('fs');
const Validator = require('jsonschema').Validator;
const valid = require('validator');


Validator.prototype.customFormats.fileExist = function(input) {
    let sourceFile = input
    if (input.split('/')[0] === "web") {
        sourceFile =  __dirname + '/../../../' + input
    }
    return (fs.existsSync(sourceFile))
};

Validator.prototype.customFormats.isAlpha = function(input) {
    return (valid.isAlpha(input))
};

Validator.prototype.customFormats.fileName = function(input) {
    const regex = new RegExp('^[^~)(\'!*<>:;,?"*|\/]+$', 'gm')
    return regex.test(input)
};

Validator.prototype.customFormats.arrayNotEmpty = function(input) {
    return (input.length > 0)
};

module.exports = new Validator();