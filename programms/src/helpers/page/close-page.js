const { Key, keyboard } = require("@nut-tree-fork/nut-js");

exports.closeOnePage = async() => {
    await keyboard.pressKey(Key.LeftControl, Key.W);
    await keyboard.releaseKey(Key.LeftControl, Key.W);
}

exports.closeTwoPage = async() => {
    await keyboard.pressKey(Key.LeftControl, Key.W);
    await keyboard.releaseKey(Key.LeftControl, Key.W);
    await keyboard.pressKey(Key.LeftControl, Key.W);
    await keyboard.releaseKey(Key.LeftControl, Key.W);
}