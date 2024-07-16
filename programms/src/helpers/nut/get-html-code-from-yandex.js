const {keyboard, Key, clipboard, mouse, straightTo, Point} = require("@nut-tree-fork/nut-js");
const { delay } = require("../delay");
const { copyText } = require("./copy-text");

const isYandexMarketPage = 'html[data-baobab-name="$page"]'

exports.getHtmlCodeFromYandex = async(url) => {
    await delay(1000)
    await keyboard.pressKey(Key.LeftControl, Key.T);
    await keyboard.releaseKey(Key.LeftControl, Key.T);
    await delay(2000)
    await clipboard.setContent(url);
    await keyboard.pressKey(Key.LeftControl, Key.V);
    await keyboard.releaseKey(Key.LeftControl, Key.V);
    await keyboard.pressKey(Key.Enter);
    await keyboard.releaseKey(Key.Enter);
    await delay(1000)
    await keyboard.pressKey(Key.LeftControl, Key.T);
    await keyboard.releaseKey(Key.LeftControl, Key.T);
    await delay(2000)
    await clipboard.setContent(`view-source:${url}`);
    await keyboard.pressKey(Key.LeftControl, Key.V);
    await keyboard.releaseKey(Key.LeftControl, Key.V);
    await keyboard.pressKey(Key.Enter);
    await keyboard.releaseKey(Key.Enter);

    let text = await copyText(1, isYandexMarketPage)

    await keyboard.pressKey(Key.LeftControl, Key.W);
    await keyboard.releaseKey(Key.LeftControl, Key.W);
    await keyboard.pressKey(Key.LeftControl, Key.W);
    await keyboard.releaseKey(Key.LeftControl, Key.W);

    return text
}

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