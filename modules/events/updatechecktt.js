const firebase = require('../../utils/firebase');

module.exports.config = {
    name: "updatechecktt",
    eventType: ["log:unsubscribe"],
    version: "1.0.0",
    credits: "JRT",
    description: "Xóa data tương tác người dùng khi out",
};

module.exports.run = async ({ event, api }) => {
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const threadID = event.threadID;
    const userID = event.logMessageData.leftParticipantFbId;
    // Lấy dữ liệu notInteract từ Firebase
    let threadData = await firebase.get('notInteract', threadID);
    if (!threadData || !Array.isArray(threadData.data)) return;
    const index = threadData.data.findIndex(item => item.id == userID);
    if (index !== -1) {
        threadData.data.splice(index, 1);
        await firebase.set('notInteract', threadID, threadData);
    }
};