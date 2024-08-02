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
		if (event.context.params && event.context.params.id) {
			const id = event.context.params.id;

			const defaultData: Data = {
				posts: [],
			};
			const db = await JSONFilePreset<Data>(
				`./../database/${database}.json`,
				defaultData
			);
			await db.read();

			const { posts } = db.data;
			// console.log(posts.find((post) => post.id === id));

			return posts.find((post) => post.id === id)
				? posts.find((post) => post.id === id)
				: false;
		} else throw "";
	} catch (error) {
		return false;
	}
});
