import { exec } from "child_process";

export default defineEventHandler(async (event) => {
	try {
		const data = await readRawBody(event);

		if (process.platform === "win32") {
			exec(`start cmd.exe /K "${data}"`);
		}
		if (process.platform === "darwin") {
			exec(`open -a Terminal ${data}`);
		}
	} catch (error) {
		return false;
	}
});
