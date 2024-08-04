const xlsx = require("json-as-xlsx");
const logger = require("./logger");
const fs = require("fs");

exports.jsonToEcxel = async function (data, file, openFolder = true) {
	try {
		const columns = Object.keys(data[0]).map((value) => {
			return {
				label: value,
				value: value,
			};
		});

		const excel_file = [
			{
				columns: columns,
				content: data,
			},
		];

		const download_path = `${__dirname
			.split("\\")
			.slice(0, -3)
			.join("\\")}\\uploads`;

		const settings = {
			fileName: `${download_path}\\excel\\${file}.xlsx`,
		};

		fs.writeFile(
			`${download_path}\\bin\\${file}.txt`,
			JSON.stringify(excel_file),
			function (err) {
				if (err) {
					logger.error(err);
				}
			}
		);

		// download_path + папка json - сохранять json файлы если excel не получилось сохранить

		xlsx(excel_file, settings, function (sheet) {
			logger.info(`DOWNLOAD COMPLETE: ${download_path}`);
			if (openFolder)
				require("child_process").exec(`start "" "${download_path}"`);
		});
	} catch (error) {
		logger.error(error);
	}
};
