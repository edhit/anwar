const { keyboard, Key, clipboard } = require("@nut-tree-fork/nut-js");
const { delay } = require("../delay");
const cheerio = require('cheerio');
const logger = require("../logger");
const { closeOnePage } = require("./close-page");

const attempts = (process.env.attempts) ? process.env.attempts : 15

async function copyText(second, filter) {
    logger.warn(`We are trying to copy a page. Attempt: ${second}/${attempts}`)
    await keyboard.pressKey(Key.LeftControl, Key.A);
    await keyboard.releaseKey(Key.LeftControl, Key.A);
    await delay(1000)
    await keyboard.pressKey(Key.LeftControl, Key.C);
    await keyboard.releaseKey(Key.LeftControl, Key.C);

    const clipb = await clipboard.getContent();

    const $ = cheerio.load(clipb);
    
    if ($(filter).text().trim() !== "") {
        await closeOnePage()
        await delay(1000)
        return clipb
    }
    await delay(second * 1000)
        
    second++
    if (second <= attempts) return await copyText(second, filter)

    return false
}

module.exports = { copyText } 