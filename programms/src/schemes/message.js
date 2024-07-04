const messages = {
    fileExist: 'The file wasn`t find',
    isAlpha: 'Must be a letter',
    isAlphanumeric: 'Must be a letter or numeric',
    arrayNotEmpty: 'Array is empty'
}

exports.message = function(name, property, text) {
    if (messages[name]) {
        return `${property}: ${messages[name]}`
    } 
    return text
}