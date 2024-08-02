import { JSONFilePreset } from "lowdb/node";

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
		const defaultData: Data = {
			posts: [],
		};
		const db = await JSONFilePreset<Data>(
			`./../database/${database}.json`,
			defaultData
		);
		await db.read();

		const { posts } = db.data;

		return posts.reverse();
	} catch (error) {
		return false;
	}
});
