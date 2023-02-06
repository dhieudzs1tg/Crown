const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");

/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

// const nodeVersion = semver.parse(process.version);
// if (nodeVersion.major < 13) {
//     logger(`Your Node.js ${process.version} is not supported, it required Node.js 13 to run bot!`, "error");
//     return process.exit(0);
// };

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const dashboard = http.createServer(function (_req, res) {
    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.write("chào cậu chủ trở lại, cảm ơn đã đồng hành cùng tôi đến tận bây giờ<3");
    res.end();
});

dashboard.listen(process.env.port || 0);

logger("Server website opened...", "[ Starting ]");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ Starting ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot("Restarting...");
            global.countRestart += 1;
            return;
        } else return;
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
    });
};
////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////


axios.get("https://raw.githubusercontent.com/dhieudzs1tg/db/main/package.json").then((res) => {
    logger(res['data']['name'], "[ NAME ]");
    logger("Version: " + res['data']['version'], "[ VERSION ]");
    logger(res['data']['description'], "[ DESCRIPTION ]");
const chalk = require('chalkercli');
const rainbow = chalk.rainbow(` 
┌─────────────────────────┤ 𝘾𝙧𝙤𝙬𝙣 𝘽𝙤𝙩 ├─────────────────────────┐

         ▄▄· ▄▄▄        ▄▄▌ ▐ ▄▌ ▐ ▄     ▄▄▄▄·       ▄▄▄▄▄
        ▐█ ▌▪▀▄ █·▪     ██· █▌▐█•█▌▐█    ▐█ ▀█▪▪     •██  
        ██ ▄▄▐▀▀▄  ▄█▀▄ ██▪▐█▐▐▌▐█▐▐▌    ▐█▀▀█▄ ▄█▀▄  ▐█.▪
        ▐███▌▐█•█▌▐█▌.▐▌▐█▌██▐█▌██▐█▌    ██▄▪▐█▐█▌.▐▌ ▐█▌·
        ·▀▀▀ .▀  ▀ ▀█▄▀▪ ▀▀▀▀ ▀▪▀▀ █▪    ·▀▀▀▀  ▀█▄▀▪ ▀▀▀ 
                         𝐖𝐞 𝐚𝐫𝐞 𝐚𝐥𝐥 𝐆𝐨𝐥𝐝𝐞𝐧..

- 𝗦𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗖𝗿𝗼𝘄𝗻 𝗕𝗼𝘁 𝗩𝗲𝗿𝘀𝗶𝗼𝗻 𝟭.𝟬.𝟵
- 𝗕𝗼𝘁 𝗧𝘆𝗽𝗲: miraiv2
- 𝗢𝘄𝗻𝗲𝗿: dhieu
- 𝗖𝗼𝗻𝘁𝗮𝗰𝘁: fb.com/dhieudzs1tg
- 𝗱𝗲𝗼 𝗻𝗵𝗮𝗻 𝗯𝗮𝗻 𝗳𝗶𝗹𝗲, 𝘀𝗵𝗮𝗿𝗲 𝗳𝗶𝗹𝗲, 𝘁𝗵𝘂𝗲 𝗯𝗼𝘁, 𝗺𝘂𝗼𝗻 𝗯𝗼𝘁 𝗻𝗵𝗲 𝗰𝗮𝗰 𝗰𝗼𝗻 𝘃𝗼 ;)

└─────────────────────────┤ 𝘾𝙧𝙤𝙬𝙣 𝙏𝙚𝙖𝙢 ├────────────────────────┘

`).stop(); // Don't start the animation

rainbow.render(); // Display the first frame

const frame = rainbow.frame(); // Get the second frame
console.log(frame);
});
startBot();
/*axios.get("https://raw.githubusercontent.com/d-jukie/miraiv2_fix/main/package.json").then((res) => {
    const local = JSON.parse(readFileSync('./package.json'));
    if (semver['lt'](local.version, res['data']['version'])) {
        if (local.autoUpdate == !![]) {
            logger('A new update is available, start update processing...', '[ UPDATE ]');
            const updateBot = {};
            updateBot.cwd = __dirname
            updateBot.stdio = 'inherit' 
            updateBot.shell = !![];
            const child = spawn('node', ['update.js'], updateBot);
            child.on('exit', function () {
                return process.exit(0);
            })
            child.on('error', function (error) {
                logger('Unable to update:' + JSON.stringify(error), '[ CHECK UPDATE ]');
            });
        } else logger('A new update is available! Open terminal/cmd and type "node update" to update!', '[ UPDATE ]'), 
        startBot();
    } else logger('You are using the latest version!', '[ CHECK UPDATE ]'), startBot();
}).catch(err => logger("Unable to check update.", "[ CHECK UPDATE ]"));*/
// THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯
