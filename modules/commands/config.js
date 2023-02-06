module.exports.config = {
  name: "config",
  version: "0.0.1",
  hasPermssion: 1,
  credits: "Adonis-Lyhai",
  description: "xem thông tin về bot",
  commandCategory: "Tiện ích",
  usages: "",
  cooldowns: 0
};
const totalPath = __dirname + '/cache/totalChat.json';
const _24hours = 86400000;
const fs = require("fs-extra");

function handleByte(byte) {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let i = 0,
      usage = parseInt(byte, 10) || 0;

  while (usage >= 1024 && ++i) {
      usage = usage / 1024;
  }

  return (usage.toFixed(usage < 10 && i > 0 ? 1 : 0) + ' ' + units[i]);
}

function handleOS(ping) {
  var os = require("os");
  var cpus = os.cpus();
  var speed, chips;
  for (var i of cpus) chips = i.model, speed = i.speed;
  if (cpus == undefined) return;
  else return msg =
      `📌 Ping: ${Date.now() - ping}ms.\n\n`;

}
module.exports.onLoad = function() {
  const {
      writeFileSync,
      existsSync
  } = require('fs-extra');
  const {
      resolve
  } = require("path");
  const path = resolve(__dirname, 'cache', 'data.json');
  if (!existsSync(path)) {
      const obj = {
          adminbox: {}
      };
      writeFileSync(path, JSON.stringify(obj, null, 4));
  } else {
      const data = require(path);
      if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
      writeFileSync(path, JSON.stringify(data, null, 4));
  }
}
module.exports.run = async function({
  api,
  args,
  event,
  Users,
  handleReply,
  permssion,
  Threads
}) {
  const moment = require("moment-timezone");
  const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
  var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
  var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
  const axios = require("axios")
  const fs = require('fs-extra');
  const request = require('request')
  const {
      threadID,
      messageID,
      senderID
  } = event;
  return api.sendMessage({
      body: `====[ ADMIN ]====\n[1] Chạy lại hệ thống BOT\n[2] Reload config\n[3] Cập nhật dữ liệu các box\n[4] Cập nhật dữ liệu người dùng\n[5] Đăng xuất tài khoản Facebook\n====[ QUẢN TRỊ VIÊN ]====\n[6] Bắt tắt chế độ chỉ quản trị viên mới sử dụng được BOT\n[7] Bật tắt chế độ cấm người dùng vào box\n[8] Bật tắt chế độ chống cướp box\n[9] Bật tắt chế độ Antiout\n[10] Kick người dùng Facebook\n====[ NGƯỜI DÙNG ]====\n[11] Xem thông tin về BOT\n[12] Xem thông tin box\n[13] Xem danh sách quản trị viên nhóm\n[14] Xem sách Admin\n[15] Xem danh sách nhóm\n-----------\n👉 Phản hồi tin nhắn này theo số mà bạn chọn\n\n`
  }, threadID, (error, info) => {
      global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "choosee",
      })
  }, event.messageID)
}
module.exports.handleReply = async function({
  args,
  event,
  Users,
  Threads,
  api,
  handleReply,
  permssion
}) {
  const {
      threadID,
      messageID,
      senderID
  } = event;
  switch (handleReply.type) {
      case "choosee": {
          switch (event.body) {
              case "1": {
                  const permission = config.OWNER
                  if (!permission.includes(event.senderID))
                      return api.sendMessage("Xin cái tuổi để reset?", event.threadID, event.messageID);


                  const {
                      threadID,
                      messageID
                  } = event;
                  return api.sendMessage(`《 Restarted successfully 》`, threadID, () => process.exit(1));
              }
              break;
              case "2": {
                  const permission = config.OWNER
                  if (!permission.includes(event.senderID))
                      return api.sendMessage("Quyền lồn biên giới", event.threadID, event.messageID);
                  const listAdmin = global.config.ADMINBOT[0];
                  if (senderID != listAdmin) return api.sendMessage("done -_-", threadID, messageID);
                  delete require.cache[require.resolve(global.client.configPath)];
                  global.config = require(global.client.configPath);
                  return api.sendMessage("Đã reload thành công config.json", event.threadID, event.messageID);
              }
              break;
              case "3": {
                  const permission = config.OWNER
                  if (!permission.includes(event.senderID))
                      return api.sendMessage("Quyền lồn biên giới", event.threadID, event.messageID);
                  const {
                      threadID
                  } = event;
                  const {
                      setData,
                      getData
                  } = Threads;
                  var inbox = await api.getThreadList(100, null, ['INBOX']);
                  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
                  const lengthGroup = list.length
                  for (var groupInfo of list) {
                      console.log(`Đã cập nhật dữ liệu của box ID: ${groupInfo.threadID}`)
                      var threadInfo = await api.getThreadInfo(groupInfo.threadID);
                      threadInfo.threadName;
                      await Threads.setData(groupInfo.threadID, {
                          threadInfo
                      });
                  }
                  console.log(`Đã cập nhật dữ liệu của ${lengthGroup} box`)
                  return api.sendMessage(`Đã cập nhật dữ liệu của ${lengthGroup} box`, threadID)
              }
              break;
              case "4": {
                  const permission = config.OWNER
                  if (!permission.includes(event.senderID))
                      return api.sendMessage("Quyền lồn biên giới", event.threadID, event.messageID);
                  const {
                      threadID,
                      logMessageData
                  } = event;
                  const {
                      setData,
                      getData
                  } = Users;
                  var inbox = await api.getThreadList(100, null, ['INBOX']);
                  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
                  for (var groupInfo of list) {
                      var {
                          participantIDs
                      } = await Threads.getInfo(groupInfo.threadID) || await api.getThreadInfo(groupInfo.threadID);
                      for (var id of participantIDs) {
                          let data = await api.getUserInfo(id);
                          data.name
                          let userName = data[id].name
                          await Users.setData(id, {
                              name: userName,
                              data: {}
                          });
                          console.log(`Đã cập nhật dữ liệu của ID: ${id}`)
                      }
                  }
                  console.log(`Update successful!`)
                  return api.sendMessage(`Successfully updated all user data!`, threadID)
              }
              break;
              case "5": {
                  const fs = global.nodemodule["fs-extra"];
                  const permission = config.OWNER

                  if (!permission.includes(event.senderID)) return api.sendMessage("cút", event.threadID, event.messageID);
                  api.sendMessage("Đang đăng xuất khỏi Facebook...", event.threadID, event.messageID)
                  api.logout()
              }
              break;
              case "6": {
                  const {
                      writeFileSync
                  } = global.nodemodule["fs-extra"];
                  const {
                      resolve
                  } = require("path");
                  const pathData = resolve(__dirname, 'cache', 'data.json');
                  const database = require(pathData);
                  const {
                      adminbox
                  } = database;
                  if (adminbox[threadID] == true) {
                      adminbox[threadID] = false;
                      api.sendMessage("» Tắt thành công chế độ quản trị viên tất cả mọi người đều có thể sử dụng bot 🔓", threadID, messageID);
                  } else {
                      api.sendMessage("» Bật thành công chế độ qtvonly (chỉ admin với qtv box mới có thể sử dụng bot) 🔒", threadID, messageID);
                      adminbox[threadID] = true;
                  }
                  writeFileSync(pathData, JSON.stringify(database, null, 4));
              }
              break;
              case "7": {
                  const info = await api.getThreadInfo(event.threadID);
                  if (!info.adminIDs.some(item => item.id == api.getCurrentUserID()))
                      return api.sendMessage('» Bot cần quyền quản trị viên nhóm', event.threadID, event.messageID);
                  const data = (await Threads.getData(event.threadID)).data || {};
                  if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
                  else data.newMember = false;
                  await Threads.setData(event.threadID, {
                      data
                  });
                  global.data.threadData.set(parseInt(event.threadID), data);
                  return api.sendMessage(`» Đã ${(data.newMember == true) ? "bật" : "tắt"} thành công cấm người dùng vào box`, event.threadID, event.messageID);
              }
              break;
              case "8": {
                  const info = await api.getThreadInfo(event.threadID);
                  if (!info.adminIDs.some(item => item.id == api.getCurrentUserID()))
                      return api.sendMessage('❯ Cần quyền quản trị viên nhóm cho bot', event.threadID, event.messageID);
                  const data = (await Threads.getData(event.threadID)).data || {};
                  if (typeof data["guard"] == "guard" || data["guard"] == false) data["guard"] = true;
                  else data["guard"] = false;
                  await Threads.setData(event.threadID, {
                      data
                  });
                  global.data.threadData.set(parseInt(event.threadID), data);
                  return api.sendMessage(`Đã ${(data["guard"] == true) ? "bật" : "tắt"} thành công chế độ chống cướp box`, event.threadID, event.messageID);
              }
              break;
              case "9": {
                  var info = await api.getThreadInfo(event.threadID);
                  let data = (await Threads.getData(event.threadID)).data || {};
                  if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
                  else data["antiout"] = false;
                  await Threads.setData(event.threadID, {
                      data
                  });
                  global.data.threadData.set(parseInt(event.threadID), data);
                  return api.sendMessage(`Đã ${(data["antiout"] == true) ? "bật" : "tắt"} thành công antiout!`, event.threadID);
              }
              break;
              case "10": {
                  var {
                      userInfo,
                      adminIDs
                  } = await api.getThreadInfo(event.threadID);
                  var success = 0,
                      fail = 0;
                  var arr = [];
                  for (const e of userInfo) {
                      if (e.gender == undefined) {
                          arr.push(e.id);
                      }
                  };

                  adminIDs = adminIDs.map(e => e.id).some(e => e == api.getCurrentUserID());
                  if (arr.length == 0) {
                      return api.sendMessage("Trong nhóm bạn không tồn tại 'Người dùng Facebook'.", event.threadID);
                  } else {
                      api.sendMessage("Nhóm bạn hiện có " + arr.length + " 'Người dùng Facebook'.", event.threadID, function() {
                          if (!adminIDs) {
                              api.sendMessage("Nhưng bot không phải là quản trị viên nên không thể lọc được.", event.threadID);
                          } else {
                              api.sendMessage("Bắt đầu lọc..", event.threadID, async function() {
                                  for (const e of arr) {
                                      try {
                                          await new Promise(resolve => setTimeout(resolve, 1000));
                                          await api.removeUserFromGroup(parseInt(e), event.threadID);
                                          success++;
                                      } catch {
                                          fail++;
                                      }
                                  }

                                  api.sendMessage("Đã lọc thành công " + success + " người.", event.threadID, function() {
                                      if (fail != 0) return api.sendMessage("Lọc thất bại " + fail + " người.", event.threadID);
                                  });
                              })
                          }
                      })
                  }
              }
              break;
              case "11": {
                  const moment = require("moment-timezone");
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
                  const res = await axios.get(`http://le31.glitch.me/poem`);
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
                  var msg = `👾𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐥𝐚̀: ${thu}, ${timeNow} 𝐯𝐚̀ ${namebot} đ𝐚̃ 𝐡𝐨𝐚̣𝐭 đ𝐨̣̂𝐧𝐠 đ𝐮̛𝐨̛̣𝐜 ${hours} 𝐠𝐢𝐨̛̀ ${minutes} 𝐩𝐡𝐮́𝐭 ${seconds} 𝐠𝐢𝐚̂𝐲\n-ID Nhân vật: ${id}\n👻────────•💜•────────👻\n  ═══📚𝐃𝐀𝐓𝐀 𝐔𝐒𝐄𝐑📚═══\n👫𝐓𝐨̂̉𝐧𝐠 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠: ${global.data.allUserID.length}\n🏫𝐓𝐨̂̉𝐧𝐠 𝐧𝐡𝐨́𝐦: ${global.data.allThreadID.length}\n🔍𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐥𝐞̣̂𝐧𝐡 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́: ${commands.size}\n\n  ═══🤖𝐁𝐎𝐓 𝐈𝐍𝐅𝐎🤖═════\n🎮𝐁𝐨𝐭 𝐓𝐲𝐩𝐞: Mirai\n🐋𝐒𝐲𝐬𝐭𝐞𝐦 𝐏𝐫𝐞𝐟𝐢𝐱: ${PREFIX}\n🤡𝐁𝐨𝐱 𝐏𝐫𝐞𝐟𝐢𝐱: ${prefix}\n🙍‍♂️𝐎𝐰𝐧𝐞𝐫: dhieu\n😈𝐓𝐨𝐭𝐚𝐥 𝐀𝐝𝐦𝐢𝐧: ${admin.length}\n\n  ════🖥️𝐒𝐘𝐒𝐓𝐄𝐌🖥️═════\n💻𝐂𝐏𝐔: ${pidusage.cpu.toFixed(1)}%\n📈𝐑𝐀𝐌: ${byte2mb(pidusage.memory)}\n🌐𝐏𝐢𝐧𝐠: ${Date.now() - timeStart}ms\n\n  ═════💟𝐓𝐡𝐢́𝐧𝐡💟═════\n💬 ${love}\n\n🎀────────•🌸•────────🎀`
                  return api.sendMessage(msg, event.threadID)
              }
              break;
              case "12": {
                  const moment = require("moment-timezone");
                  const request = require("request")
                  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
                  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
                  let totalChat = JSON.parse(fs.readFileSync(totalPath));
                  let threadInfo = await api.getThreadInfo(event.threadID);
                  let timeByMS = Date.now();

                  var memLength = threadInfo.participantIDs.length;
                  let threadMem = threadInfo.participantIDs.length;
                  var nameMen = [];
                  var gendernam = [];
                  var gendernu = [];
                  var nope = [];
                  for (let z in threadInfo.userInfo) {
                      var gioitinhone = threadInfo.userInfo[z].gender;
                      var nName = threadInfo.userInfo[z].name;
                      if (gioitinhone == "MALE") {
                          gendernam.push(z + gioitinhone)
                      } else if (gioitinhone == "FEMALE") {
                          gendernu.push(gioitinhone)
                      } else {
                          nope.push(nName)
                      }
                  };
                  var nam = gendernam.length;
                  var nu = gendernu.length;
                  let qtv = threadInfo.adminIDs.length;
                  let sl = threadInfo.messageCount;
                  let u = threadInfo.nicknames;
                  let icon = threadInfo.emoji;

                  let threadName = threadInfo.threadName;
                  let id = threadInfo.threadID;
                  let sex = threadInfo.approvalMode;
                  var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';


                  if (!totalChat[event.threadID]) {
                      totalChat[event.threadID] = {
                          time: timeByMS,
                          count: sl,
                          ytd: 0
                      }
                      fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
                  }

                  let mdtt = "Chưa có thống kê";
                  let preCount = totalChat[event.threadID].count || 0;
                  let ytd = totalChat[event.threadID].ytd || 0;
                  let hnay = (ytd != 0) ? (sl - preCount) : "Chưa có thống kê";
                  let hqua = (ytd != 0) ? ytd : "Chưa có thống kê";
                  if (timeByMS - totalChat[event.threadID].time > _24hours) {
                      if (timeByMS - totalChat[event.threadID].time > (_24hours * 2)) {
                          totalChat[event.threadID].count = sl;
                          totalChat[event.threadID].time = timeByMS - _24hours;
                          totalChat[event.threadID].ytd = sl - preCount;
                          fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
                      }
                      getHour = Math.ceil((timeByMS - totalChat[event.threadID].time - _24hours) / 3600000);
                      if (ytd == 0) mdtt = 100;
                      else mdtt = ((((hnay) / ((hqua / 24) * getHour))) * 100).toFixed(0);
                      mdtt += "%";
                  }

                  var callback = () =>
                      api.sendMessage({
                              body: `» Tên box: ${threadName}\n» ID Box: ${id}\n» Phê duyệt: ${pd}\n» Emoji: ${icon}\n» Thông tin:\n» Tổng ${threadMem} thành viên\n» 👨‍🦰Nam: ${nam} thành viên \n» 👩‍🦰Nữ: ${nu} thành viên\n» 🕵️‍♂️Với ${qtv} quản trị viên\n» 💬 Tổng: ${sl} tin nhắn\n» 📈 Mức độ tương tác: ${mdtt}\n🌟 Tổng số tin nhắn hôm qua: ${hqua}\n🌟 Tổng số tin nhắn hôm nay: ${hnay}\n   === 「${timeNow}」 ===`,
                              attachment: fs.createReadStream(__dirname + '/cache/box.png')
                          },
                          threadID,
                          () => fs.unlinkSync(__dirname + '/cache/box.png')
                      );
                  return request(encodeURI(`${threadInfo.imageSrc}`))
                      .pipe(fs.createWriteStream(__dirname + '/cache/box.png'))
                      .on('close', () => callback());
              }
              break;
              case "13": {
                  var threadInfo = await api.getThreadInfo(event.threadID);
                  let qtv = threadInfo.adminIDs.length;
                  var listad = '';
                  var qtv2 = threadInfo.adminIDs;
                  dem = 1;
                  for (let i = 0; i < qtv2.length; i++) {
                      const info = (await api.getUserInfo(qtv2[i].id));
                      const name = info[qtv2[i].id].name;
                      listad += '' + `${dem++}` + '. ' + name + '\n';
                  }

                  api.sendMessage(
                      `Danh sách ${qtv} quản trị viên gồm:\n ${listad}`, event.threadID, event.messageID)
              }
              break;
              case "14": {
                  const {
                      ADMINBOT
                  } = global.config;
                  listAdmin = ADMINBOT || config.ADMINBOT || [];
                  var msg = [];
                  for (const idAdmin of listAdmin) {
                      if (parseInt(idAdmin)) {
                          const name = (await Users.getData(idAdmin)).name
                          msg.push(`»  ${name}\nLink: fb.me/${idAdmin}`);
                      }
                  }
                  return api.sendMessage(`======〘『ADMIN』〙======\n${msg.join("\n")}\n`, event.threadID, event.messageID);
              }
              break;
              case "15": {
                  let threadInfo = await api.getThreadInfo(event.threadID);
                  var inbox = await
                  api.getThreadList(300, null, ["INBOX"]);
                  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

                  var abc = "💌 Danh sách bot đang tham gia 💌\n";
                  let i = 0;
                  for (var groupInfo of list) {
                      abc += `${i+=1}. ${groupInfo.name}\n💌 ID BOX: ${groupInfo.threadID}\n------------------------------\n`;
                  }
                  api.sendMessage(abc, event.threadID);
              }
              break;
          }
      }
  }
}


module.exports.handleEvent = async ({
  api,
  event
}) => {
  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
  let totalChat = JSON.parse(fs.readFileSync(totalPath));
  if (!totalChat[event.threadID]) return;
  if (Date.now() - totalChat[event.threadID].time > (_24hours * 2)) {
      let sl = (await api.getThreadInfo(event.threadID)).messageCount;
      totalChat[event.threadID] = {
          time: Date.now() - _24hours,
          count: sl,
          ytd: sl - totalChat[event.threadID].count
      }
      fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
  }
}