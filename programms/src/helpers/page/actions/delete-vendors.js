// *************************
//
// Если есть совпадения с продавцами на странице "все предложения", то мы не сохраняем товар
//
// *************************

const cheerio = require("cheerio");
const { getHtmlCodeFromPage } = require("../get-html-code-from-page");

const yandexMarket = process.env.yandexMarket
	? process.env.yandexMarket
	: "https://market.yandex.ru";
const linkAllPrice = process.env.linkAllPrice
	? process.env.linkAllPrice
	: "&grhow=supplier&how=aprice&local-offers-first=0";

const all_prices = process.env.all_prices
	? process.env.all_prices
	: 'div[data-baobab-name="morePrices"] a';

async function allPricesLink(html) {
	const $ = cheerio.load(html);

	return $(all_prices).attr("href");
}

exports.deleteVendors = async (html, filter, data) => {
	// let all_prices = await allPricesLink(html)
	// let i = 0
	// while (!all_prices && i < 5) {
	//     all_prices = await allPricesLink(html)
	//     i++
	// }

	let all_prices = await allPricesLink(html);

	if (all_prices) {
		html = await getHtmlCodeFromPage(
			`${yandexMarket}${all_prices}${linkAllPrice}`,
			filter
		);
	} else return false;

	const $ = cheerio.load(html);

	let flag = true;
	for (const value of data) {
		if (
			$("html")
				.text()
				.toUpperCase()
				.indexOf(`"shopName":"${value}","businessId":`.toUpperCase()) >
			0
		) {
			console.log(`"shopName":"${value}","businessId":`.toUpperCase());
			console.log(
				$("html")
					.text()
					.toUpperCase()
					.indexOf(
						`"shopName":"${value}","businessId":`.toUpperCase()
					)
			);
			flag = false;
		}
	}

	return flag;
};
