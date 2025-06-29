const firebase = require('../../utils/firebase');

module.exports = function () {
	return {
		async getAll() {
			try {
				return await firebase.getAll('currencies');
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async getData(userID) {
			try {
				return await firebase.get('currencies', userID) || false;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async setData(userID, options = {}) {
			if (typeof options !== 'object') throw new Error('needObject');
			try {
				await firebase.set('currencies', userID, options);
				return true;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async delData(userID) {
			try {
				await firebase.del('currencies', userID);
				return true;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async createData(userID, defaults = {}) {
			if (typeof defaults !== 'object') throw new Error('needObject');
			try {
				await firebase.set('currencies', userID, defaults);
				return true;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async increaseMoney(userID, money) {
			if (typeof money !== 'number') throw new Error('needNumber');
			try {
				let data = await this.getData(userID);
				let balance = data && data.money ? data.money : 0;
				await this.setData(userID, { money: balance + money });
				return true;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
		async decreaseMoney(userID, money) {
			if (typeof money !== 'number') throw new Error('needNumber');
			try {
				let data = await this.getData(userID);
				let balance = data && data.money ? data.money : 0;
				if (balance < money) return false;
				await this.setData(userID, { money: balance - money });
				return true;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		}
	};
};