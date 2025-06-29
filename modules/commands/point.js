const firebase = require('../../utils/firebase');

module.exports.config = {
  name: "point",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Converted to Firebase",
  description: "Xem điểm của bạn hoặc người khác",
  commandCategory: "Tiện ích",
  usages: "[tag hoặc reply hoặc để trống]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  let targetID = event.senderID;
  if (Object.keys(event.mentions).length > 0) {
    targetID = Object.keys(event.mentions)[0];
  } else if (event.type === 'message_reply') {
    targetID = event.messageReply.senderID;
  } else if (args[0]) {
    targetID = args[0];
  }

  // Lấy điểm từ Firebase
  let data = await firebase.get('points', targetID);
  let point = data && typeof data.point === 'number' ? data.point : 0;
  let name = data && data.name ? data.name : 'Người dùng';

  return api.sendMessage(
    `${name} hiện có ${point} điểm.`,
    event.threadID,
    event.messageID
  );
};
