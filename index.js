const { spawn } = require("child_process");
const http = require("http");
const chalk = require('chalk');
const figlet = require('figlet');
///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////
const PORT = process.env.PORT || 2025;
const express = require("express");
const app = express();

// Define a route
app.get('/', (request, response) => {
    const result = `Nhớ ib Facebook Lương Trường Khôi để cập nhật file nha (free) Facebook: https://www.facebook.com/LunarKrystal.Dev`;
    response.send(result);
});
// Start the server
app.listen(PORT, () => {
    console.log(chalk.red(`[ SECURITY ] -> Máy chủ khởi động tại port: ${PORT}`));
});

function startBot(message) {
    if (message) console.log(message);
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", async (codeExit) => {
        if (codeExit == 1) return startBot("Đang Khởi Động Lại, Vui Lòng Chờ ...");
        else if (String(codeExit).startsWith('2')) {
            await new Promise(resolve => setTimeout(resolve, parseInt(String(codeExit).replace('2','')) * 1000));
            startBot("Bot has been activated please wait a moment!!!");
        }
        else return;
    });

    child.on("error", function (error) {
        console.log("An error occurred: " + JSON.stringify(error));
    });
};

console.log(chalk.yellow(figlet.textSync('KRYSTAL', { horizontalLayout: 'full' })));
console.log(chalk.green("Lương Trường Khôi chúc bạn sử dụng file vui vẻ!"))
startBot();