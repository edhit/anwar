var cp = require("child_process");

if (process.platform === "win32") {
	cp.exec(`start cmd.exe /K "cd frontend & npm run dev"`);
}
if (process.platform === "darwin") {
	exec(`open -a Terminal "cd frontend & npm run dev"`);
}
