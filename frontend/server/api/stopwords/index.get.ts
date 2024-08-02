import { JSONFilePreset } from "lowdb/node";

type Stopwords = {
	path_file: string;
	words: [];
	new_file: string;

	id: string;
	command: string;
	name: string;
	date: string;
	time: number;
};

type Data = {
	posts: Stopwords[];
};

const database = "stopwords";

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
