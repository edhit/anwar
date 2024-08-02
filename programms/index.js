require("dotenv").config();
const logger = require("./src/helpers/logger");

process.argv.forEach(function (val, index, array) {
	try {
		(async () => {
			if (index === 2) {
				const { init } = require("./src/" + val);
				init(array.slice(2));
			}
		})();
	} catch (error) {
		logger.error(error);
	}
});
