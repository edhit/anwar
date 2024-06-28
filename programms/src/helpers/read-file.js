const excelToJson = require('convert-excel-to-json');

exports.readFile = async function(path) {
	return excelToJson({
		sourceFile: __dirname + '/../../../' + path, // Указать путь до файла с данными от поставщика
	});
}