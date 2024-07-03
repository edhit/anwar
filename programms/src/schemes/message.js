const messages = {
    path_file: 'The path file wasn`t find',
    letter: 'The column must be a letter',
    price: 'The column must be a letter',
    file: 'We can`t create file beacause the name of file doesn`t correct'
}

exports.message = function(path, text) {
    if (messages[path]) {
        return messages[path]
    } 
    return text
}