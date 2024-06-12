<template>
	<view class="flex-col section_300" id="openInfo">
		<image src="/static/image/16599387354366087480.png" class="image_1000" />
		<view class="flex-col group_100">
			<view class="flex-col">
				<view class="flex-col items-start text-wrapper123"><text class="text_600">教室名称：{{classname}}</text>
				</view>
				<view class="flex-row group_700">
					<view>
						<image src="/static/image/16599387357386602916.png" class="image_80000" />
						<text class="text_700">设备开关状态</text>
					</view>
					<view>
						<text class="text_700">累计能耗：{{(switchData.dnNodePower/1000).toFixed(2)}} kW·h</text>
					</view>
				</view>
				<view class="divider123">
					<!--*-->
				</view>
			</view>
			<view class="justify-between equal-division123">
				<view class="flex-col items-center equal-division123-item" :key="j"
					v-for="(item, j) in switchData.dnSubNodeCount " :style="{'background-color':lives}">
					<text class="text_801">{{switchData.dnNodeValue[j] === '1'?'打开':'关闭'}}</text>
					<image v-if="switchData.dnNodeValue[j] === '1'" @click="setLightstatus(j+1,0)"
						src="/static/image/919c48b43aecee1700e1b28b1c0643e9.png" class="image_900" />
					<image v-else-if="switchData.dnNodeValue[j] ==='0'" @click="setLightstatus(j+1,1)"
						src="/static/image/54499d9e56aa8e07dd84f28505f66985.png" class="image_900" />
					<text class="text_800">开关{{j+1}}</text>
				</view>
			</view>
			<view class="flex-row group_800">
				<image src="/static/image/16599387354387739894.png" class="image_1300" />
				<text class="text_1200">设备环境状态监测</text>
			</view>
			<view class="flex-row group_900">
				<view class="flex-col section_700" :style="{'background-color':TEMP1}">
					<text class="text_1300">温度</text>
					<image src="/static/image/16599387354392088618.png" class="image_14416541654165" />
					<view class="justify-center group_100 view123">
						<text class="text_14213 text_15123">温度：</text>
						<text class="text_16213">{{TEMP}}℃</text>
					</view>
				</view>
				<view class="flex-col section_800" :style="{'background-color':HUM1}">
					<text class="text_17123">湿度</text>
					<image src="/static/image/16599387354393505540.png" class="image_15123" />
					<view class="justify-center group_100 view_112">
						<text class="text_14213 text_18123">湿度 ：</text>
						<text class="text_19213">{{HUM}}%</text>
					</view>
				</view>
				<view class="flex-col section_900" :style="{'background-color':PM251}">
					<text class="text_20123">PM2.5</text>
					<image src="/static/image/16599387354394292576.png" class="image_16123" />
					<view class="justify-center group_100 view_112">
						<text class="text_14213 text_18123">PM2.5：</text>
						<text class="text_22213">{{PM25}}</text>
					</view>
				</view>
				<view class="flex-col section_1000" :style="{'background-color':PM101}">
					<text class="text_23123">PM10</text>
					<image src="/static/image/16599387354392632626.png" class="image_1712" />
					<view class="flex-row group_100 view_3213">
						<text class="text_2423">PM10：</text>
						<text class="text_2523">{{PM10}}</text>
					</view>
				</view>
				<view class="flex-col section_11132" :style="{'background-color':CO21}">
					<view class="justify-between">
						<text class="text_26231">CO2</text>
						<image src="/static/image/16599387354396246598.png" class="image_1832" />
					</view>
					<view class="flex-row group_1002">
						<text class="text_2723">CO2：</text>
						<text class="text_28213">{{CO2}}</text>
					</view>
				</view>
				<view class="flex-col section_11132" :style="{'background-color':TVOC1}">
					<view class="justify-between">
						<text class="text_26231">TVOC</text>
						<image src="/static/image/16599387354392428091.png" class="image_1832" />
					</view>
					<view class="flex-row group_1002">
						<text class="text_2723">TVOC：</text>
						<text class="text_28213">{{TVOC}}</text>
					</view>
				</view>
				<view class="flex-col section_11132" :style="{'background-color':PA1}">
					<view class="justify-between">
						<text class="text_26231">甲醛</text>
						<image src="/static/image/16599387354391721287.png" class="image_1832" />
					</view>
					<view class="flex-row group_1002">
						<text class="text_2723">甲醛：</text>
						<text class="text_28213">{{PA}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["arrays", "classname"],
		name: 'classClick',
		components: {},
		data() {
			return {
				mqttC: "",
				dstID: '',
				list: [],

				switchData: {},
				envData: {},
				CO2: 0,
				PA: 0,
				TVOC: 0,
				PM25: 0,
				PM10: 0,
				TEMP: 0,
				HUM: 0,

				CO21: '#afafad',
				PA1: '#afafad',
				TVOC1: '#afafad',
				PM251: '#afafad',
				PM101: '#afafad',
				TEMP1: '#afafad',
				HUM1: '#afafad',
				lives: '#afafad'
			};
		},
		created() {
			this.initData()
			this.mqttC = this.$mqtt.message("ZHZM/Result/" + this.arrays, (topic, msg) => {
				let data = JSON.parse(msg)
				if (data.cmd == 18) {
					let dstArr = data.result.data.devlist
					for (var i = 0; i < dstArr.length; i++) {
						let params = dstArr[i]
						switch (params.type) {
							case 1:
								this.switchData.dnNodeValue = params.state
								// this.switchData = params
								// if (this.switchData.dnNodeOnline) {
								// 	this.lives = '#1e9fff'
								// } else {
								// 	this.lives = '#afafad'
								// }
								break;
								// case 2:
								// 	this.envData = params
								// 	this.parseEnvData()
								// 	break;
							default:
								break;
						}

					}
				}
				console.log(msg);
			})
		},
		beforeDestroy() {
			this.$mqtt.removeMessage(this.mqttC)
		},
		methods: {

			setLightstatus(nodenumb, state, s) {
				console.log(nodenumb, state, s);
				if (!this.switchData.dnNodeOnline) {
					uni.showToast({
						icon: 'none',
						duration: 2000,
						title: "设备离线",
						position:"bottom"
					})
					return
				}
				this.$api.SetGatewayDeviceControl({
					action: state,
					dstId: this.arrays,
					dnNodeIdx: nodenumb
				})
			},
			parseEnvData() {
				var state = ('\{"' + this.envData.dnNodeValue.replace(/=/g, '":')
					.replace(/\|/g, ',"')
					.replace(/\./, '') + '}');
				var sersondata = JSON.parse(state);
				this.CO2 = sersondata.CO2 * 1;
				if (this.CO2 < 350) {
					this.CO21 = '#a3ffb4';
				} else if (this.CO2 < 450) {
					this.CO21 = '#fef65b';
				} else if (this.CO2 < 1000) {
					this.CO21 = '#ffa500';
				} else if (this.CO2 < 2000) {
					this.CO21 = '#e07719';
				} else if (this.CO2 < 5000) {
					this.CO21 = '#ff0a4b';
				} else if (this.CO2 >= 5000) {
					this.CO21 = '#ff0000';
				}
				this.PA = sersondata.PA * 1;
				if (this.PA < 50) {
					this.PA1 = '#a3ffb4';
				} else if (this.PA < 100) {
					this.PA1 = '#fef65b';
				} else if (this.PA < 200) {
					this.PA1 = '#ffa500';
				} else if (this.PA < 300) {
					this.PA1 = '#e07719';
				} else if (this.PA > 300) {
					this.PA1 = '#ff0a4b';
				}
				this.TVOC = sersondata.TVOC * 1;
				if (this.TVOC < 300) {
					this.TVOC1 = '#a3ffb4';
				} else if (this.TVOC < 600) {
					this.TVOC1 = '#fef65b';
				} else if (this.TVOC < 1500) {
					this.TVOC1 = '#ffa500';
				} else if (this.TVOC < 2000) {
					this.TVOC1 = '#e07719';
				} else if (this.TVOC < 3000) {
					this.TVOC1 = '#ff0a4b';
				} else if (this.TVOC >= 3000) {
					this.TVOC1 = '#ff0000';
				}
				this.PM25 = sersondata.PM25 * 1;
				if (this.PM25 < 50) {
					this.PM251 = '#a3ffb4';
				} else if (this.PM25 < 100) {
					this.PM251 = '#fef65b';
				} else if (this.PM25 < 150) {
					this.PM251 = '#ffa500';
				} else if (this.PM25 < 200) {
					this.PM251 = '#e07719';
				} else if (this.PM25 < 300) {
					this.PM251 = '#ff0a4b';
				} else if (this.PM25 >= 300) {
					this.PM251 = '#ff0000';
				}
				this.PM10 = sersondata.PM10 * 1;
				if (this.PM10 < 50) {
					this.PM101 = '#a3ffb4';
				} else if (this.PM10 < 150) {
					this.PM101 = '#ffa500';
				} else if (this.PM10 >= 150) {
					this.PM101 = '#ff0a4b';
				}
				this.TEMP = sersondata.TEMP * 1;
				console.log(this.TEMP);
				if (this.TEMP < 15) {
					this.TEMP1 = '#0252ff';
				} else if (this.TEMP < 25) {
					this.TEMP1 = '#a3ffb4';
				} else if (this.TEMP >= 25) {
					this.TEMP1 = '#ff0571';
				}
				console.log(this.TEMP1);
				this.HUM = sersondata.HUM * 1;
				if (this.HUM < 15) {
					this.HUM1 = '#ff0a4b';
				} else if (this.HUM < 55) {
					this.HUM1 = '#a3ffb4';
				} else if (this.HUM > 55) {
					this.HUM1 = '#0252ff';
				}
			},
			async initData() {
				let dstArr = (await this.$api.GetGatewayDevicesList({
					dstId: this.arrays
				})).data
				for (var i = 0; i < dstArr.length; i++) {
					let params = dstArr[i]
					switch (params.dnNodeType) {
						case 1:
							this.switchData = params
							if (this.switchData.dnNodeOnline) {
								this.lives = '#1e9fff'
							} else {
								this.lives = '#afafad'
							}
							break;
						case 2:
							this.envData = params
							this.parseEnvData()
							break;
						default:
							break;
					}

				}
			}
		},
	};
</script>

<style scoped lang="css">
	@keyframes mymove {
		from {
			transform: scale(0);
		}

		to {
			transform: scale(1);
		}
	}

	@-moz-keyframes mymove

	/* Firefox */
		{
		from {
			transform: scale(0);
		}

		to {
			transform: scale(1);
		}
	}

	@-webkit-keyframes mymove

	/* Safari 和 Chrome */
		{
		from {
			transform: scale(0);
		}

		to {
			transform: scale(1);
		}
	}

	@-o-keyframes mymove

	/* Opera */
		{
		from {
			transform: scale(0);
		}

		to {
			transform: scale(1);
		}
	}

	#openInfo {
		/* position: absolute; */
		/* z-index: 999; */
		/* transform: scale(0.5); */
		animation: mymove 0.6s infinite;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;

		-moz-animation: mymove 0.6s infinite;
		-moz-animation-fill-mode: forwards;
		-moz-animation-iteration-count: 1;

		-webkit-animation: mymove 0.6s infinite;
		-webkit-animation-fill-mode: forwards;
		-webkit-animation-iteration-count: 1;

		-o-animation: mymove 0.6s infinite;
		-o-animation-fill-mode: forwards;
		-o-animation-iteration-count: 1;
	}

	.section_300 {
		border-radius: 0.78vw;
	}

	.image_1000 {
		border-radius: 0.78vw;
		width: calc(100vw - 40px);
		height: 44.5313vw;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.group_100 {
		/* top: 10vw; */
		position: relative;
	}

	.equal-division123 {
		margin-top: 3.28vw;
		align-self: center;
		width: 73.85vw;
	}

	.group_800 {
		margin: 4.01vw 0.47vw 0;
		padding: 0 1.2vw 1.56vw;
		border-bottom: solid 0.052vw #e9e9e9;
	}

	.group_900 {
		padding: 3.49vw 1.82vw 4.06vw 1.93vw;
	}

	.text-wrapper123 {
		padding: 1.67vw 0 1.15vw;
		background-color: #1e9fff;
		border-radius: 0.78vw 0.78vw 0px 0px;
	}

	.group_700 {
		justify-content: space-between;
		padding: 1.93vw 1.72vw 1.3vw;
	}

	.divider123 {
		margin-left: 0.52vw;
		margin-right: 1.25vw;
		height: 0.052vw;
		border: solid 0.098vw #e9e9e9;
	}

	.equal-division123-item {
		padding: 0.89vw 0;
		background-color: #1e9fff;
		box-shadow: 0px 0.052vw 1.09vw #262e2d0f;
		border-radius: 0.78vw;
		width: 15.83vw;
		height: 10.05vw;
		border: solid 0.049vw #e7e7e7;
		position: relative;
	}

	.equal-division123-item1 {
		padding: 0.89vw 0;
		background-color: #8b8b6859;
		box-shadow: 0px 0.052vw 1.09vw #262e2d0f;
		border-radius: 0.78vw;
		width: 15.83vw;
		height: 10.05vw;
		border: solid 0.049vw #e7e7e7;
		position: relative;
	}

	.image_1300 {
		margin: 0.26vw 0;
		width: 0.99vw;
		height: 0.99vw;
	}

	.text_1200 {
		margin-left: 1.2vw;
		color: #333333;
		font-size: 1.56vw;
		font-family: Adobe Heiti Std;
		line-height: 1.51vw;
	}

	.section_700 {
		padding: 1.41vw 1.15vw 1.56vw;
		flex: 1 1 11.77vw;
		background-color: #ffffff;
		box-shadow: 0px 0.52vw 1.41vw #1c8af159;
		/* background-image: linear-gradient(-30deg, #43ea80 0%, #38f8d4 100%); */
		border-radius: 0.52vw;
		height: 7.29vw;
		position: relative;
	}

	.section_800 {
		margin-left: 0.99vw;
		padding: 1.41vw 1.15vw 1.56vw;
		flex: 1 1 11.77vw;
		background-color: #ffffff;
		box-shadow: 0px 0.52vw 1.41vw #0ec8cd59;
		/* background-image: linear-gradient(-30deg, #43ea80 0%, #38f8d4 100%); */
		border-radius: 0.52vw;
		height: 7.29vw;
		position: relative;
	}

	.section_900 {
		margin-left: 0.94vw;
		padding: 1.51vw 1.25vw 1.61vw;
		flex: 1 1 11.77vw;
		background-color: #ffffffcc;
		box-shadow: 0px 0.52vw 1.41vw #aea52259;
		/* background-image: linear-gradient(-30deg, #fbf180 0%, #ffea00 100%); */
		border-radius: 0.52vw;
		height: 7.29vw;
		position: relative;
	}

	.section_1000 {
		margin-left: 0.99vw;
		padding: 1.51vw 1.25vw 1.56vw;
		flex: 1 1 11.77vw;
		background-color: #ffffffcc;
		box-shadow: 0px 0.52vw 1.41vw #c5711659;
		/* background-image: linear-gradient(-30deg, #ff9f3c 0%, #ffb837 100%); */
		border-radius: 0.52vw;
		height: 7.29vw;
		position: relative;
	}

	.section_11132 {
		margin-left: 0.99vw;
		padding: 1.3vw 1.15vw 1.61vw;
		flex: 1 1 11.77vw;
		/* background-image: linear-gradient(-30deg, #43ea80 0%, #38f8d4 100%); */
		box-shadow: 0px 0.52vw 1.41vw #10c2c859;
		border-radius: 0.52vw;
		height: 7.29vw;
		position: relative;
	}

	.view_4123 {
		margin-left: 0.94vw;
		flex: 1 1 11.77vw;
	}

	.view_50321 {
		margin-left: 0.94vw;
		flex: 1 1 11.77vw;
	}

	.text_600 {
		margin-left: 1.77vw;
		color: #ffffff;
		font-size: 1.56vw;
		font-family: Source Han Sans SC;
		line-height: 1.51vw;
	}

	.image_80000 {
		margin: 0.26vw 0;
		width: 1.04vw;
		height: 0.99vw;
	}

	.text_700 {
		margin-left: 0.99vw;
		color: #333333;
		font-size: 1.56vw;
		font-family: Adobe Heiti Std;
		line-height: 1.51vw;
	}

	.image_900 {
		width: 5.83vw;
		height: 5.83vw;
	}

	.text_800 {
		margin-top: 1.51vw;
		color: #fff;
		font-size: 0.89vw;
		font-family: Adobe Heiti Std;
		line-height: 0.83vw;
	}

	.text_801 {
		position: absolute;
		right: 10px;
		color: #fff;
		font-size: 0.89vw;
	}

	.text_1300 {
		align-self: flex-start;
		color: #fffeff;
		font-size: 1.46vw;
		font-family: Adobe Heiti Std;
		line-height: 1.35vw;
	}

	.image_14416541654165 {
		width: 1.41vw;
		height: 2.76vw;
		position: absolute;
		right: 1.82vw;
		top: 0.89vw;
	}

	.view123 {
		margin-top: 1.51vw;
	}

	.text_17123 {
		align-self: flex-start;
		color: #fffeff;
		font-size: 1.46vw;
		font-family: Adobe Heiti Std;
		line-height: 1.35vw;
	}

	.image_15123 {
		width: 2.66vw;
		height: 2.76vw;
		position: absolute;
		right: 1.09vw;
		top: 0.89vw;
	}

	.view_112 {
		margin-top: 1.56vw;
	}

	.text_20123 {
		align-self: flex-start;
		color: #fffeff;
		font-size: 1.46vw;
		font-family: Adobe Heiti Std;
		line-height: 1.15vw;
	}

	.image_16123 {
		width: 3.13vw;
		height: 3.13vw;
		position: absolute;
		right: 1.35vw;
		top: 0.68vw;
	}

	.view_2223 {
		margin-top: 1.67vw;
	}

	.text_23123 {
		align-self: flex-start;
		color: #fffeff;
		font-size: 1.46vw;
		font-family: Adobe Heiti Std;
		line-height: 1.15vw;
	}

	.image_1712 {
		width: 3.13vw;
		height: 3.13vw;
		position: absolute;
		right: 1.15vw;
		top: 0.68vw;
	}

	.view_3213 {
		margin-top: 1.72vw;
	}

	.group_1002 {
		margin-top: 0.52vw;
	}

	.section_1221 {
		opacity: 0.8;
		background-image: linear-gradient(-30deg, #ff5e90 0%, #d20041 100%);
		box-shadow: 0px 0.52vw 1.41vw #99153f59;
		border-radius: 0.52vw;
		height: 7.29vw;
		position: relative;
	}

	.text_29213 {
		color: #fffeff;
		font-size: 1.46vw;
		font-family: Adobe Heiti Std;
		line-height: 1.15vw;
		position: absolute;
		left: 1.15vw;
		top: 1.51vw;
	}

	.text_30123 {
		color: #fffeff;
		font-size: 1.09vw;
		font-family: Adobe Heiti Std;
		line-height: 0.83vw;
		position: absolute;
		left: 1.15vw;
		bottom: 1.72vw;
	}

	.image_1912 {
		width: 2.19vw;
		height: 3.13vw;
		position: absolute;
		right: 1.51vw;
		top: 0.52vw;
	}

	.text_3121 {
		color: #fffeff;
		font-size: 1.77vw;
		font-family: Adobe Heiti Std;
		line-height: 1.35vw;
		position: absolute;
		bottom: 1.61vw;
		left: 50%;
		transform: translateX(-50%);
	}

	.section_1312 {
		opacity: 0.8;
		background-image: linear-gradient(-30deg, #ff9f3c 0%, #ffb837 100%);
		box-shadow: 0px 0.52vw 1.41vw #c5711659;
		border-radius: 0.52vw;
		height: 7.29vw;
		position: relative;
	}

	.text_33231 {
		color: #fffeff;
		font-size: 1.46vw;
		font-family: Adobe Heiti Std;
		line-height: 1.41vw;
		position: absolute;
		left: 1.3vw;
		top: 1.41vw;
	}

	.image_2021 {
		width: 3.02vw;
		height: 2.4vw;
		position: absolute;
		right: 1.09vw;
		top: 0.73vw;
	}

	.text_34213 {
		color: #fffeff;
		font-size: 1.09vw;
		font-family: Adobe Heiti Std;
		line-height: 1.04vw;
		position: absolute;
		left: 1.25vw;
		bottom: 1.61vw;
	}

	.text_14213 {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.text_15123 {
		color: #fffeff;
		font-size: 1.09vw;
		font-family: Adobe Heiti Std;
		line-height: 1.04vw;
	}

	.text_16213 {
		color: #fffeff;
		font-size: 1.77vw;
		font-family: Adobe Heiti Std;
		line-height: 1.46vw;
	}

	.text_18123 {
		color: #fffeff;
		font-size: 1.09vw;
		font-family: Adobe Heiti Std;
		line-height: 1.04vw;
	}

	.text_19213 {
		color: #fffeff;
		font-size: 1.77vw;
		font-family: Adobe Heiti Std;
		line-height: 1.41vw;
	}

	.text_21213 {
		color: #fffeff;
		font-size: 1.09vw;
		font-family: Adobe Heiti Std;
		line-height: 0.83vw;
	}

	.text_22213 {
		color: #fffeff;
		font-size: 1.77vw;
		font-family: Adobe Heiti Std;
		line-height: 1.35vw;
	}

	.text_2423 {
		margin: 0.36vw 0 0.16vw;
		color: #fffeff;
		font-size: 1.09vw;
		font-family: Adobe Heiti Std;
		line-height: 0.83vw;
	}

	.text_2523 {
		margin-left: 0.13vw;
		color: #fffeff;
		font-size: 1.77vw;
		font-family: SourceHanSansCN;
		line-height: 1.35vw;
	}

	.text_26231 {
		margin-top: 0.21vw;
		color: #fffeff;
		font-size: 1.46vw;
		font-family: Adobe Heiti Std;
		line-height: 1.15vw;
	}

	.image_1832 {
		width: 3.02vw;
		height: 2.5vw;
	}

	.text_2723 {
		margin-top: 0.42vw;
		color: #fffeff;
		font-size: 1.09vw;
		font-family: Adobe Heiti Std;
		line-height: 0.83vw;
	}

	.text_28213 {
		color: #fffeff;
		font-size: 1.77vw;
		font-family: Adobe Heiti Std;
		line-height: 1.35vw;
	}
</style>