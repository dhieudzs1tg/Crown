module.exports.config = {
    name: "uptime",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Mirai - JRT",
    description: "Kiểm tra thời gian bot đã online",
    commandCategory: "Thông tin",
    cooldowns: 5,
    dependencies: {
        "pidusage": "",
        "fast-speedtest-api": ""
    }
};

function byte2mb(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0,
        n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.run = async ({
    api,
    event,
    arg,
    Users
}) => {
    const axios = global.nodemodule["axios"];
    const fast = global.nodemodule["fast-speedtest-api"];
    const speedTest = new fast({
        token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
        verbose: false,
        timeout: 10000,
        https: true,
        urlCount: 5,
        bufferSize: 8,
        unit: fast.UNITS.Mbps
    });
    const ketqua = await speedTest.getSpeed();
    const request = require('request');
    const res = await axios.get(`https://jrt-api.jrt-official.repl.co/love`);
    var love = res.data.data;
    const req = await axios.get(`https://jrt-api.jrt-official.repl.co/cadao`);
    var cadao = req.data.data;
    const jrt = await axios.get(`https://jrt-api.jrt-official.repl.co/thayboi`);
    var thayboi = jrt.data.data;
    const rep = await axios.get(`https://jrt-api.jrt-official.repl.co/joker`);
    var joker = rep.data.data;
    const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
    const namebot = config.BOTNAME
    const PREFIX = config.PREFIX
    const admin = config.ADMINBOT
    const {
        commands
    } = global.client;
    const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX :
        global.config.PREFIX;
    var ping = Date.now();

    var threadInfo = await api.getThreadInfo(event.threadID);
    var love = res.data.data
    const time = process.uptime(),
        hours = Math.floor(time / (60 * 60)),
        minutes = Math.floor((time % (60 * 60)) / 60),
        seconds = Math.floor(time % 60);
    const pidusage = await global.nodemodule["pidusage"](process.pid);
    const moment = require("moment-timezone");
    const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
    if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
    if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
    if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚'
    if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
    if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
    if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
    if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'
    var id = Math.floor(Math.random() * 883) + 1
    axios.get('https://apimyjrt.jrt-official.repl.co/instagram.php').then(res => {
        let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
        let callback = function() {
            api.sendMessage({
                body: `👾𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐥𝐚̀: ${thu}, ${timeNow} 𝐯𝐚̀ ${namebot} đ𝐚̃ 𝐡𝐨𝐚̣𝐭 đ𝐨̣̂𝐧𝐠 đ𝐮̛𝐨̛̣𝐜 ${hours} 𝐠𝐢𝐨̛̀ ${minutes} 𝐩𝐡𝐮́𝐭 ${seconds} 𝐠𝐢𝐚̂𝐲\n-ID Nhân vật: ${id}\n👻────────•💜•────────👻\n  ═══📚𝐃𝐀𝐓𝐀 𝐔𝐒𝐄𝐑📚═══\n👫𝐓𝐨̂̉𝐧𝐠 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠: ${global.data.allUserID.length}\n🏫𝐓𝐨̂̉𝐧𝐠 𝐧𝐡𝐨́𝐦: ${global.data.allThreadID.length}\n🔍𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐥𝐞̣̂𝐧𝐡 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́: ${commands.size}\n\n  ═══🤖𝐁𝐎𝐓 𝐈𝐍𝐅𝐎🤖═════\n🎮𝐁𝐨𝐭 𝐓𝐲𝐩𝐞: Mirai\n🐋𝐒𝐲𝐬𝐭𝐞𝐦 𝐏𝐫𝐞𝐟𝐢𝐱: ${PREFIX}\n🤡𝐁𝐨𝐱 𝐏𝐫𝐞𝐟𝐢𝐱: ${prefix}\n🙍‍♂️𝐎𝐰𝐧𝐞𝐫: dhieu\n😈𝐓𝐨𝐭𝐚𝐥 𝐀𝐝𝐦𝐢𝐧: ${admin.length}\n\n  ════🖥️𝐒𝐘𝐒𝐓𝐄𝐌🖥️═════\n💻𝐂𝐏𝐔: ${pidusage.cpu.toFixed(1)}%\n📈𝐑𝐀𝐌: ${byte2mb(pidusage.memory)}\n🌐𝐏𝐢𝐧𝐠: ${Date.now() - timeStart}ms\n\n  ═════💟𝐓𝐡𝐢́𝐧𝐡💟═════\n💬 ${love}\n\n🎀────────•🌸•────────🎀`,
                attachment: fs.createReadStream(__dirname + `/cache/waifu.${ext}`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/waifu.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/waifu.${ext}`)).on("close", callback);
    })
}