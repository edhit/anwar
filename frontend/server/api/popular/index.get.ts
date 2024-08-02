import { JSONFilePreset } from "lowdb/node";

type Popular = {
	path_file: string;
	letter: string;
	price: string;
	type: string;
	opinion: number;
	rate: number;
	new_file: string;

	id: string;
	command: string;
	name: string;
	date: string;
	time: number;
};

type Data = {
	posts: Popular[];
};

const database = "popular";

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
