const fse = require("fs-extra")
const approved = __dirname + "/../commands/cache/approvedThreads.json"
module.exports.config = {
    name: "checkduyet",
    eventType: ["log:subscribe"],
    version: "1.1.1",
    credits: "DC-Nam",
    description: "Noti check duyแปt"
};
module.exports.run = async function({
    api,
    event,
    Users
}) {
    const {
        threadID,
        logMessageData
    } = event
    const {
        PREFIX
    } = global.config
    const {
        getCurrentUserID: botID,
        sendMessage: send,
        unsendMessage: unsend
    } = api
    let data = JSON.parse(fse.readFileSync(approved))
    if (logMessageData.addedParticipants.find(i => i.userFbId == botID())) {
        send("๐๐ก๐๐๐ค ๐ญ๐ก๐ ๐๐ฉ๐ฉ๐ซ๐จ๐ฏ๐๐ ๐ฅ๐ข๐ฌ๐ญ...", event.threadID, (error, info) => {
            setTimeout(function() {
                unsend(info.messageID)
                if (!data.includes(threadID)) send("๐ค๐ฬฬ๐ญ ๐ง๐จฬฬ๐ข ๐ญ๐ก๐ฬฬ๐ญ ๐๐ฬฃ๐ข, ๐ง๐ก๐จฬ๐ฆ ๐๐ฬฃ๐ง ๐๐ก๐ฎฬ๐ ๐๐ฎฬ๐จฬฬฃ๐ ๐๐ฎ๐ฒ๐ฬฃฬ๐ญ ๐๐ฬฬ ๐ ๐ฎฬฬ๐ข ๐ฒ๐ฬ๐ฎ ๐๐ฬฬ๐ฎ ๐๐ฎฬ๐ง๐  '" + PREFIX + "request'", threadID)
                else send(`๐๐๐ฬฬ๐ญ ๐ง๐จฬฬ๐ข ๐๐ฬฬ๐ง ๐ง๐ก๐จฬ๐ฆ ๐ญ๐ก๐ฬ๐ง๐ก ๐๐จฬ๐ง๐ !.\n๐ฆโ๐ฬ๐ฆ ๐๐ฬฬ๐ก ๐๐ฬฬ๐ข ๐ฃ๐ฬฬ๐ ๐โ๐ขฬฬ๐๐ ๐๐ฬฃฬ๐โ ๐๐ขฬ๐ฬฬ๐ ๐๐ฬ๐ฆ ๐๐ฬฬ ๐๐ฬ๐ ๐๐ข๐๐ ๐โ๐ฬ!\nเผโโโโโโโโโโโโโโโเผ\n๐ ${PREFIX}help (๐๐๐ ๐๐๐๐ ๐ค๐ฬ๐๐ ๐ฅ๐ ๐ฬ๐ ๐๐ ฬฃฬ ๐๐ฬฃฬ๐๐)\nโโโโโโโโใโโโโโโโโ\n๐ฅ๐ซ๐ฬ๐๐ ๐๐ฬฃฬ๐๐ ๐๐๐ฬฃฬ๐ ๐๐๐ฬ๐ ๐๐๐๐ :( :(`, threadID)
            }, 5000);
        })
    } else return
}