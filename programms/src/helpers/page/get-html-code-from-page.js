const { keyboard, Key, clipboard } = require("@nut-tree-fork/nut-js");
const { delay } = require("../delay");
const { copyText } = require("./copy-page");

// exports.getHtmlCodeFromMain = async(url, filter) => {
//     // await delay(1000)
//     // await keyboard.pressKey(Key.LeftControl, Key.T);
//     // await keyboard.releaseKey(Key.LeftControl, Key.T);
//     // await delay(2000)
//     // await clipboard.setContent(url);
//     // await keyboard.pressKey(Key.LeftControl, Key.V);
//     // await keyboard.releaseKey(Key.LeftControl, Key.V);
//     // await keyboard.pressKey(Key.Enter);
//     // await keyboard.releaseKey(Key.Enter);
//     // await delay(1000)
//     // await keyboard.pressKey(Key.LeftControl, Key.T);
//     // await keyboard.releaseKey(Key.LeftControl, Key.T);
//     // await delay(2000)
//     // await clipboard.setContent(`view-source:${url}`);
//     // await keyboard.pressKey(Key.LeftControl, Key.V);
//     // await keyboard.releaseKey(Key.LeftControl, Key.V);
//     // await keyboard.pressKey(Key.Enter);
//     // await keyboard.releaseKey(Key.Enter);
//     require('child_process').exec(`start ${url}`);
//     await delay(2000)
//     await keyboard.pressKey(Key.LeftControl, Key.U);
//     await keyboard.releaseKey(Key.LeftControl, Key.U);

//     return await copyText(1, filter)
// }

function getRandomInt(max) {
	max = max === 0 ? 1 : max;
	return Math.floor(Math.random() * max);
}

exports.getHtmlCodeFromPage = async (url, filter) => {
	await delay(3000 + getRandomInt(1000));
	await keyboard.pressKey(Key.LeftControl, Key.T);
	await keyboard.releaseKey(Key.LeftControl, Key.T);
	await delay(3000 + getRandomInt(1000));
	await clipboard.setContent(url);
	await keyboard.pressKey(Key.LeftControl, Key.V);
	await keyboard.releaseKey(Key.LeftControl, Key.V);
	await keyboard.pressKey(Key.Enter);
	await keyboard.releaseKey(Key.Enter);
	await delay(3000 + getRandomInt(1000));
	await keyboard.pressKey(Key.LeftControl, Key.U);
	await keyboard.releaseKey(Key.LeftControl, Key.U);

	// await keyboard.pressKey(Key.LeftControl, Key.T);
	// await keyboard.releaseKey(Key.LeftControl, Key.T);
	// await delay(2000)
	// await clipboard.setContent(`view-source:${url}`);
	// await keyboard.pressKey(Key.LeftControl, Key.V);
	// await keyboard.releaseKey(Key.LeftControl, Key.V);
	// await keyboard.pressKey(Key.Enter);
	// await keyboard.releaseKey(Key.Enter);

	return await copyText(1, filter);
};
// const target = new Point(500, 350);

// await mouse.move(straightTo(target));

// async function copy(time) {

//     // console.log(time);

//     await keyboard.pressKey(Key.LeftControl, Key.A);
//     await keyboard.releaseKey(Key.LeftControl, Key.A);
//     await delay(1000)
//     await keyboard.pressKey(Key.LeftControl, Key.C);
//     await keyboard.releaseKey(Key.LeftControl, Key.C);

//     const clipb = await clipboard.getContent();

//     const $ = cheerio.load(clipb);
//     // console.log($(isYandexMarketPage).text().trim());
//     if ($(isYandexMarketPage).text().trim() !== "")  return clipb
//     await delay(time * 1000)

//     time++
//     if (time < 10) return await copy(time)

//     return false
// }
