import { JSONFilePreset } from "lowdb/node";

type Automatics = {
	path_file: string;
	deleteVendorData: [];
	new_file: string;

	id: string;
	command: string;
	name: string;
	date: string;
	time: number;
};

type Data = {
	posts: Automatics[];
};

const database = "automatics";

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
