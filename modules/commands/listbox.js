module.exports.config = {
    name: "listbox",
    version: "1.0.0",
    credits: "ManhG",
    hasPermssion: 2,
    description: "[Ban/Unban/Del/Remove] List[Data] thread bot đã tham gia",
    commandCategory: "Admin bot",
    usages: "[số trang/all]",
    cooldowns: 5
}, module.exports.handleReply = async function({
    api: e,
    event: a,
    args: n,
    Threads: s,
    handleReply: t
}) {
    const {
        threadID: d,
        messageID: o
    } = a;
    if (parseInt(a.senderID) !== parseInt(t.author)) return;
    const r = require("moment-timezone").tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
    var g = a.body.split(" "),
        l = t.groupid[g[1] - 1],
        h = t.groupName[g[1] - 1];
    switch (t.type) {
        case "reply":
            if ("ban" == g[0] || "Ban" == g[0]) {
                const a = (await s.getData(l)).data || {};
                return a.banned = 1, a.dateAdded = r, await s.setData(l, {
                    data: a
                }), global.data.threadBanned.set(l, {
                    dateAdded: a.dateAdded
                }), e.sendMessage("»Thông báo từ Admin«\n\n Nhóm Bạn Đã Bị Ban, cấm dùng bot.", l, (() => e.sendMessage(`${e.getCurrentUserID()}`, (() => e.sendMessage(`★★BanSuccess★★\n\n🔷${h} \n🔰TID:${l} `, d, (() => e.unsendMessage(t.messageID)))))))
            }
            if ("unban" == g[0] || "Unban" == g[0] || "ub" == g[0] || "Ub" == g[0]) {
                const a = (await s.getData(l)).data || {};
                return a.banned = 0, a.dateAdded = null, await s.setData(l, {
                    data: a
                }), global.data.threadBanned.delete(l, 1), e.sendMessage("»Thông báo từ Admin«\n\n Nhóm Bạn Đã Được Gỡ Ban", l, (() => e.sendMessage(`${e.getCurrentUserID()}`, (() => e.sendMessage(`★★UnbanSuccess★★\n\n🔷${h} \n🔰TID:${l} `, d, (() => e.unsendMessage(t.messageID)))))))
            }
            if ("del" == g[0] || "Del" == g[0]) {
                const n = (await s.getData(l)).data || {};
                await s.delData(l, {
                    data: n
                }), console.log(h), e.sendMessage(`★★DelSuccess★★\n\n🔷${h} \n🔰TID: ${l} \n Xóa data thành công!`, a.threadID, a.messageID);
                break
            }
            if ("out" == g[0] || "Out" == g[0]) {
                e.sendMessage("»Thông báo từ Admin«\n\n ★★Đã out khỏi nhóm chat★★", l, (() => e.sendMessage(`${e.getCurrentUserID()}`, (() => e.sendMessage(`★★OutSuccess★★\n\n🔷${h} \n🔰TID:${l} `, d, (() => e.unsendMessage(t.messageID, (() => e.removeUserFromGroup(`${e.getCurrentUserID()}`, l)))))))));
                break
            }
    }
}, module.exports.run = async function({
    api: e,
    event: a,
    args: n
}) {
    if ("all" !== n[0]) {
        const {
            threadID: n,
            messageID: r
        } = a;
        d = [], o = "";
        u = 1;
        try {
            t = global.data.allThreadID
        } catch (e) {
            console.log(e)
        }
        for (const e of t) {
            var s = await global.data.threadInfo.get(e).threadName || "Tên không tồn tại";
            d.push(`${u++}. ${s} \n🔰UID: ${e}`)
        }
        return e.sendMessage(0 != d.length ? e.sendMessage(`🍄Hiện tại đang có ${d.length} nhóm\n\n${d.join("\n")}`, n, r) : "Hiện tại không có nhóm nào!", n, r)
    }
    var t, d = [],
        o = "";
    try {
        t = await e.getThreadList(100, null, ["INBOX"])
    } catch (e) {
        console.log(e)
    }
    for (const e of t) 1 == e.isGroup && d.push({
        threadName: e.name,
        threadID: e.threadID,
        messageCount: e.messageCount
    });
    d.sort(((e, a) => e.messageCount > a.messageCount ? -1 : e.messageCount < a.messageCount ? 1 : void 0));
    var r = [],
        g = [],
        l = 1;
    (l = parseInt(n[0]) || 1) < -1 && (l = 1);
    for (var h = 100, o = "🎭DS NHÓM [Data]🎭\n\n", i = Math.ceil(d.length / h), u = h * (l - 1); u < h * (l - 1) + h && !(u >= d.length); u++) {
        let e = d[u];
        o += `${u+1}. ${e.threadName}\n🔰TID: ${e.threadID}\n💌MessageCount: ${e.messageCount}\n`, r.push(e.threadID), g.push(e.threadName)
    }
    o += `--Trang ${l}/${i}--\nDùng ${global.config.PREFIX}allbox + số trang/all\n\n`, e.sendMessage(o + "🎭Reply Out, Ban, Unban, Del[data] + số thứ tự để Out, Ban, Unban, Del[data] thread đó!", a.threadID, ((e, n) => global.client.handleReply.push({
        name: this.config.name,
        author: a.senderID,
        messageID: n.messageID,
        groupid: r,
        groupName: g,
        type: "reply"
    })))
};