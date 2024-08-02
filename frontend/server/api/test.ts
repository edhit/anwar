import { nanoid } from "nanoid";
import fs from "fs";

interface File {
	name: string;
	content: string;
	size: string;
	type: string;
	lastModified: string;
}

export default defineEventHandler(async (event) => {
	try {
		const { files } = await readBody<{ files: File[] }>(event);
		let new_name = nanoid(11);
		let root = process.cwd().split("\\");
		root.pop();

		let name = "no_file.xlsx";

		let outputFileName = `${root.join("\\")}/uploads/site/${new_name}`;

		for (const file of files) {
			name = file.name;
			const { binaryString } = parseDataUrl(file.content);
			outputFileName = `${outputFileName}.${
				name.split(".")[name.split(".").length - 1]
			}`;
			fs.createWriteStream(outputFileName).write(binaryString);
		}

		const path = `${outputFileName}`.replaceAll("\\", "/");

		return {
			path: path,
			name: name.split(".")[0],
		};
	} catch (error) {
		return false;
	}
});
