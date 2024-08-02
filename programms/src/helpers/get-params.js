const { default: axios } = require("axios");
const logger = require("./logger");

exports.getParams = async function (param, id) {
	try {
		const options = {
			method: "GET",
			url: `http://localhost:3000/api/${param}/${id}`,
			responseType: "json",
		};

		let request = await axios.request(options);
		let data = request.data;

		return data;
	} catch (error) {
		logger.error(error);
	}
};
