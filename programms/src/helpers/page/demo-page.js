var fs = require("fs");
const cheerio = require("cheerio");

exports.demoPage = function () {
	let $ = cheerio.load(fs.readFileSync("./src/helpers/page/file.html"));

	console.log(
		$("html")
			.text()
			.toUpperCase()
			.indexOf(`"shopName":"Техно-Лайт ООО"`.toUpperCase())
	);
};

this.demoPage();
