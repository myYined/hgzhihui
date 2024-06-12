let mqtt = require('./mqtt')
let api = require('./api')
import CryptoJS from "crypto-js";
// let mqtt = require('./mqtt.min')
let client = null
var options = {
	keepalive: 10,
	connectTimeout: 4000,
	clientId: Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8),
	username: 'sml_admin',
	password: 'sml_000000',
};
export default {
	getUUID() {
		return options.clientId
	},
	launch(option) {
		
		async function apiLogin(option) {
			console.log(option,'option');
			let resData = await api.SetLogin({
				"usr": option.iUsername,
				"pwd": option.iPassword,
				"uuId": options.clientId
			})
			if (resData.code == 1) {
				console.log(resData.data);
				uni.setStorage({
					key: 'loginData',
					data: {
						checked:option.checked,
						iUsername: option.iUsername,
						iPassword: option.iPassword
					},
					success() {
						console.log('存储成功')
					}
				})
				uni.setStorage({
					key: "usrInfo",
					data: resData.data.usrInfo
				}),
				uni.reLaunch({
					url: '/pages/infomate/infomate?deptName='+resData.data.deptName
				});
			}
		}
		uni.showLoading({
			title: '请求中'
		});
		console.log(option);
		console.log("启动mqtt", client);
		if (client) {
			// if (client.connected)
			// 	return
			client.end()
			client = null
		}
		options.username = option.username
		options.password = option.password
		console.log(options);
		client = mqtt.connect(option.url, options);

		console.log(client);
		client.on('connect', async () => {
			console.log("MQTT服务器连接成功");
			apiLogin(option)
		})
		client.on('close', () => {
			console.log("MQTT服务器被关闭");
			// this.subscribe('toAppMessage/#')
			// uni.showToast({
			// 	title:"MQTT服务器重连成功",
			// 	icon:'none'
			// })
		})
		client.on('reconnect', () => {
			// console.log("MQTT服务器重连成功");
			// this.subscribe('toAppMessage/#')
			// uni.showToast({
			// 	title:"MQTT服务器尝试重连...",
			// 	icon:'none'
			// })
		})
		client.on('error', (e) => {
			console.log('error', e);
		})
		client.on('offline', (e) => {
			uni.hideLoading();
			console.log('offline', e);
		})
		client.on('disconnect', (e) => {
			console.log('disconnect', e);
		})

		// setInterval(()=>{
		// 	console.log(client.connected);
		// },1000)
	},
	
	removeMessage(_function) {
		// console.log(_function);
		console.log("removeMessage");
		client.removeListener('message', _function);
	},
	message(_topic, _callback) {
		console.log("MQTTMSEEAGE");

		function decode(str) {
			let binArr = JSON.parse(JSON.stringify(str)).data
			let hexstring = arrayBufferToHexString(binArr);
			let data = CryptoJS.enc.Hex.parse(hexstring);
			const key = CryptoJS.enc.Hex.parse("31323334353637383930313233343536");
			var option = {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.ZeroPadding
			};
			data = CryptoJS.enc.Base64.stringify(data);
			const words = CryptoJS.AES.decrypt(data, key, option);
			var hex = CryptoJS.enc.Hex.stringify(words);
			return hexStringToString(hex)
		}

		function arrayBufferToHexString(buffer) {
			const byteArray = new Uint8Array(buffer);
			let hexString = '';
			for (let i = 0; i < byteArray.length; i++) {
				const hex = byteArray[i].toString(16).padStart(2, '0');
				hexString += hex;
			}

			return hexString;
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

		function callback(topic, message) {
			let topicArr = _topic.split('/')
			if (topicArr[topicArr.length - 1] == '#') {
				let topicArr2 = topic.split('/')
				topicArr2[topicArr2.length - 1] = ""
				topicArr[topicArr.length - 1] = ""
				if (JSON.stringify(topicArr2) == JSON.stringify(topicArr)) {
					try {
						_callback(topic, decode(message))
					} catch (e) {
						//TODO handle the exception
						console.log("MQTTERR", e);
					}
				}
			} else {
				if (_topic === topic) {
					try {
						_callback(topic, decode(message))
					} catch (e) {
						//TODO handle the exception
						console.log("MQTTERR", e);
					}
				}
			}
		}
		client.addListener('message', callback)
		return callback
	},
	end() {
		client.end()
		client = null
	},
	unsubscribe(topic) {
		// client.removeAllListeners('message');
		client.unsubscribe(topic, {
			qos: 0
		}, function(error) {
			if (error) {
				console.log(error)
			} else {
				console.log('Unsubscribed')
			}
		})
	},
	subscribe(topic) {
		client.subscribe(topic, {
			qos: 0
		})
		console.log('subscribe:', topic)
	},
	publish(topic, message) {
		client.publish(topic, message, {
			qos: 0
		})
	}

}