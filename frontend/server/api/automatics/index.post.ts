import { JSONFilePreset } from "lowdb/node";
import { v4 as uuidv4 } from "uuid";

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
			deleteVendorData: data.deleteVendorData,
			new_file: `automatics_${data.name}`,
			command: `node ${command.join("/")}/programms ${database}`,
			date: datestring,
			time: Date.now(),
		});

		await db.write();

		return true;
	} catch (error) {
		console.log(error);

		return false;
	}
});
