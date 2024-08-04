const { mouse, keyboard, screen } = require("@nut-tree-fork/nut-js");
const { path } = require("ghost-cursor");
const { delay } = require("../delay");

function getRandomInt(max) {
	max = max === 0 ? 1 : max;
	return Math.floor(Math.random() * max);
}

async function mouseMove(last = undefined) {
	const width = await screen.width();
	const height = await screen.height();

	let from;
	if (last === undefined) {
		from = {
			x: width / 2 + 15 * getRandomInt(50),
			y: height * Math.random(),
		};
	} else {
		from = last;
	}
	const to = {
		x: width / 2 + 15 * getRandomInt(50),
		y: height * Math.random(),
	};

	const route = path(from, to);
	for (let index = 0; index < route.length; index++) {
		await mouse.move({ x: route[index].x, y: route[index].y });
		await delay(getRandomInt(20));
	}

	await mouseMove(route.slice(-1)[0]);
}

module.exports = { mouseMove };
