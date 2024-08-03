var cp = require("child_process");

if (process.platform === "win32") {
	cp.exec(`start cmd.exe /K "cd programms & npm i & cd ../frontend & npm i"`);
}
if (process.platform === "darwin") {
	exec(`open -a Terminal "cd programms & npm i & cd ../frontend & npm i"`);
}
