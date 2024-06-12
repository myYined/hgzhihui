import CryptoJS from "crypto-js";
import * as Api from './api.js'
import mqttTools from './mqttTools.js'

function decode(str) {
	let data = CryptoJS.enc.Base64.parse(str);
	const key = CryptoJS.enc.Hex.parse("31323334353637383930313233343536");
	var option = {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.ZeroPadding,

	};
	data = CryptoJS.enc.Base64.stringify(data);
	const words = CryptoJS.AES.decrypt(data, key, option);
	const decryptedStr = words.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}

function encode(str) {
	const key = CryptoJS.enc.Hex.parse("31323334353637383930313233343536");
	var option = {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.ZeroPadding
	};
	const words = CryptoJS.AES.encrypt(JSON.stringify(str), key, option);
	// var hex = CryptoJS.enc.Hex.stringify(words);
	return words.toString()
	// return hexStringToString(hex)
}

function hexStringToString(hexString) {
	let string = '';

	for (let i = 0; i < hexString.length; i += 2) {
		const hex = hexString.substr(i, 2);
		const byte = parseInt(hex, 16);
		string += String.fromCharCode(byte);
	}

	return string;
}
export default function request(api, method, data, s) {
	return new Promise((resolve, reject) => {

		let connectData = uni.getStorageSync("connectData");

		// let url = 'http://' + connectData.uIp + ':3367'
		let url = connectData.uUrl;
		let header = {
			'Content-Type': 'application/json'
		};
		data = data || {}
		if (api != '/api/AppControl/SetLogin') {
			data.usrInfo = uni.getStorageSync('usrInfo');
		}
		if (!s) {
			uni.showLoading({
				title: '请求中'
			});
		}
		uni.request({
			url: url + api,
			method: method || 'GET',
			data: encode(data),
			header: header,
			success: async (res) => {
				let params = JSON.parse(decode(res.data))
				if (!s) {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						duration: 2000,
						title: params.msg,
						position:"bottom"
					})
				}
				if (params.code == 401) {
					console.log("登录过期");
					// 无感续token
					// 获取连接信息，判断是否有登录信息
					let loginData = uni.getStorageSync("loginData")
					if (loginData) {
						console.log(loginData);
						let resData = await Api.SetLogin({
							"usr": loginData.iUsername,
							"pwd": loginData.iPassword,
							"uuId": mqttTools.getUUID()
						})
						console.log(resData);
						// resolve("test")
						console.log(resData);
						if (resData.code == 1) {
							uni.setStorageSync("usrInfo", resData.data.usrInfo)
							let rResult = await request(api, method, data, s)
							console.log('rResult', rResult);
							resolve(rResult)
						} else {
							uni.reLaunch({
								url: '/pages/login/login'
							})
							resolve(params);
							return
						}
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
						resolve(params);
						return
					}
					return
				}
				resolve(params);
			},
			fail: (err) => {
				uni.hideLoading();
				uni.showToast({
					icon: 'none',
					duration: 2000,
					title: "请求失败，请检查ip是否有误",
					position:"bottom"
				})
				reject('系统错误');
			}
		})
	})
	// if(!api.includes('login')){
	// data.lang = uni.getLocale()
	// var token = db.get('token');
	// var e = db.get('lang');
	// if (token) {
	// 	header.Authorization= 'Bearer '+token
	// }
	// if(e){
	// 	header.Lang= 'en' 
	// }
	// }
}

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => request(api, method, data, opt)
});