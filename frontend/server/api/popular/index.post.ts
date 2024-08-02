import { JSONFilePreset } from "lowdb/node";
import { v4 as uuidv4 } from "uuid";

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
		const data = await readBody(event);
		const command = process.cwd().split("\\");
		command.pop();

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
			name: data.name,
			path_file: data.path_file,
			letter: data.letter,
			price: data.price,
			type: data.type,
			opinion: data.opinion,
			rate: data.rate,
			new_file: `popular_${data.name}`,
			command: `node ${command.join("/")}/programms ${database}`,
			date: datestring,
			time: Date.now(),
		});

		await db.write();

		return true;
	} catch (error) {
		return false;
	}
});
