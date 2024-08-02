import { JSONFilePreset } from "lowdb/node";
import { v4 as uuidv4 } from "uuid";

type Yandex = {
	businessid: string;
	sk: string;
	cookie: string;

	id: string;
	date: string;
	time: number;
};

type Data = {
	posts: Yandex[];
};

const database = "yandex";

export default defineEventHandler(async (event) => {
	try {
		const data = await readBody(event);

		const defaultData: Data = {
			posts: [],
		};
		const db = await JSONFilePreset<Data>(
			`./../database/${database}.json`,
			defaultData
		);
		const d = new Date();
		const datestring =
			d.getDate() +
			"-" +
			(d.getMonth() + 1) +
			"-" +
			d.getFullYear() +
			" " +
			d.getHours() +
			":" +
			d.getMinutes();

		db.data.posts.push({
			id: uuidv4(),
			businessid: data.businessid,
			sk: data.sk,
			cookie: data.cookie,
			date: datestring,
			time: Date.now(),
		});

		await db.write();

		return true;
	} catch (error) {
		return false;
	}
});
