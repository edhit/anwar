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

			if (id === "last") {
				return posts[posts.length - 1];
			} else {
				return posts.find((post) => post.id === id)
					? posts.find((post) => post.id === id)
					: false;
			}
		} else throw "";
	} catch (error) {
		return false;
	}
});
