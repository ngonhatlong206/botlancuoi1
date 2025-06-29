const firebase = require('../../utils/firebase');

module.exports = function () {
	return {
		async getInfo(threadID, api) {
			try {
				return await api.getThreadInfo(threadID);
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
		},
		async getAll() {
			try {
				return await firebase.getAll('threads');
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async getData(threadID) {
			try {
				return await firebase.get('threads', threadID) || false;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async setData(threadID, options = {}) {
			if (typeof options !== 'object') throw new Error('needObject');
			try {
				await firebase.set('threads', threadID, options);
				return true;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async delData(threadID) {
			try {
				await firebase.del('threads', threadID);
				return true;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async createData(threadID, defaults = {}) {
			if (typeof defaults !== 'object') throw new Error('needObject');
			try {
				await firebase.set('threads', threadID, defaults);
				return true;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		}
	};
};