<template>
	<view class="flex-col page">
		<view class="flex-col items-center group_1">
			<image src="/static/image/16599373488541923481.png" class="image_36" />
			<view class="flex-col section_1">
				<image src="/static/image/16599373488648318759.png" class="image_37" />
				<view class="flex-col group_1">
					<view class="justify-between section_2">
						<view class="flex-row">
							<image src="/static/image/16599382405758396865.png" class="image" />
							<text class="text">{{deptName}}</text>
						</view>
						<view class="flex-row group_2">
							<view class="flex-row">
								<image src="/static/image/16599382408430275183.png" class="image_1 image_4"
									@click="getDevDataList()" />
								<text class="text_1">刷新</text>
								<image @click="setAllLightstatus(1)" src="/static/image/16599382408234703426.png"
									class="image_1" />
								<text class="text_2">全开</text>
								<image @click="setAllLightstatus(0)" src="/static/image/16599382407668362161.png"
									class="image_1" />
								<text class="text_3">全关</text>
							</view>
							<view class="flex-row group_4" @click="showDrawer('showLeft')">
								<image src="/static/image/c9931428406ce3438d38c43b0ffda17b.png" class="image_5" />
								<text class="text_4">楼栋</text>
								<uni-drawer ref="showLeft" mode="right" :width="320"
									@change="change($event,'showLeft')">
									<view class="vielow">
										<image src="/static/image/16599382407215152290.png" class="image_drawer" />
										<text class="text_drawer">楼栋</text>
									</view>
									<hr size=1
										style="color: white;border-style:dotted;width:72%;margin-left: 14%;margin-top: 5%;">
									<view class="info-content">
										<text class="text_tab3" v-if="buildno===0"
											@click.stop="getBuildNumb(0)">√全部楼栋</text>
										<text class="text_tab2" v-if="buildno!==0"
											@click.stop="getBuildNumb(0)">全部楼栋</text>
									</view>
									<!-- <div class="image_drawer2"></div> -->
									<hr size=1
										style="color: white;border-style:dotted;width:72%;margin-left: 14%;margin-top: 4%;">
									<view class="info-content" :key="item" v-for="(item) in buildnumb">

										<text class="text_tab1" v-if="item===buildno"
											@click.stop="getBuildNumb(item)">√楼栋:{{item}}</text>
										<text class="text_tab" v-else
											@click.stop="getBuildNumb(item)">楼栋:{{item}}</text>
										<hr size=1
											style="color: white;border-style:dotted;width:80%;margin-left: 10%;margin-top: 5%;">
									</view>

								</uni-drawer>
							</view>
							<view class="flex-row group_5" @click="exitToindex()">
								<image src="/static/image/fdfe375c2d74e17110237ed99532dac5.png" class="image_5" />
								<text class="text_5">退出</text>
							</view>
						</view>
					</view>

					<scroll-view :enable-back-to-top="true" class="main-scroll" scroll-y>
						<view class="grid">
							<view class="flex-col grid-item" :key="i" v-for="(item, i) in classlist">
								<image v-if="item.dstOnline === 1" src="/static/image/16599382399987302353.png"
									class="image_10" />
								<image v-else-if="item.dstOnline === 0" src="/static/image/16599382403721096153.png"
									class="image_18" />
								<view class="flex-col group_24" @click="onClickImage_1(item)">
									<view
										:class="item.dstOnline === 0?'flex-col items-start text-wrapper_1':'flex-col items-start text-wrapper'">
										<text class="text_6 text_36">教室名称：{{item.name}}</text>
										<!-- {{item.child.devlist}} -->
									</view>
									<view class="flex-col group_6">
										<view class="flex-row group_7">
											<image v-if="item.light == '1' && item.dstOnline === 1"
												src="/static/image/16599382400025954571.png" class="image_8" />
											<image v-else
												src="/static/image/16599382403823633030.png" class="image_8" />
											<!-- <image v-if="item.light == '1' " @click.stop="setLightstatus(item,0)"
												src="/static/image/16599382400025954571.png" class="image_8" />
											<image v-else-if="item.light == '0'" @click.stop="setLightstatus(item,1)"
												src="/static/image/16599382403823633030.png" class="image_8" /> -->
										</view>
										<view class="flex-row group_8">
											<view :class="item.dstOnline === 0?'section_6':'section_3'">
											</view>
											<text class="text_8" v-if="item.dstOnline === 0">设备状态：离线</text>
											<text class="text_8" v-if="item.dstOnline === 1">设备状态：<text style="color: #1e9fff;">在线</text> </text>
										</view>
										<view class="divider" v-if="item.dstOnline === 0">
										</view>
										<view class="dividerb" v-if="item.dstOnline === 1">
										</view>
									</view>
								</view>
							</view>

						</view>
					</scroll-view>

					<view class="flex-row section_9">
						<fandcChange @change="fandcChange" class="text_27 flex-col items-center section_10">
						</fandcChange>
						<view v-if="fandcType==0" class="flex-col items-center section_10" :key="i"
							v-for="(item, i) in floordata" @click="handleOnFloorClick(item)"
							:style="floorSelect==item?'background-color: rgba(4, 18, 91, 0.37)':''">
							<text class="text_27" v-if="item == 0">全部</text>
							<text class="text_27" v-if="item != 0">{{item}}F</text>
						</view>
						<view v-if="fandcType==1" class="flex-col items-center section_10" :key="i"
							v-for="(item, i) in classdata" @click="handleOnClassClick(item)"
							:style="classSelect==item?'background-color: rgba(4, 18, 91, 0.37)':''">
							<text class="text_27" v-if="item == 0">全部</text>
							<text class="text_27" v-if="item != 0">{{item}}</text>
						</view>
					</view>
					<uni-popup ref="popup" type="center" :animation="true" @change="classShowChange">
						<classClick2 @closePop="closePop" :arrays="sendlist.dstId" />
						<!-- <classClick :arrays="sendlist.dstId" :classname="sendlist.classname" /> -->
					</uni-popup>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var loadsersonsdata;
	export default {
		components: {},
		data() {
			return {
				deptName:"",
				fandcType: 0,
				listdevlist: false,
				list: true,
				flag: false,
				devstatus: '离线',
				IpAddress: '',
				classlist: [],
				devlistdata: '',
				classlistnumb: 0,

				key: 'BEA01EA43A514F608E9DE1938F441FD1',
				showRight: false,
				showLeft: false,

				floorno: 0,
				classno: 0,
				sendlist: {},

				buildnumb: [],
				floordata: [],
				classdata: [],
				floorSelect: 0,
				classSelect: 0,
				buildno: 0,
				mqttC: "",
				timeoutId: "",
				classShow: false
			};
		},
		onUnload() {
			this.$mqtt.removeMessage(this.mqttC)
		},
		// TODO 增加自动续token功能
		async onLoad(options) {
			this.deptName = options.deptName
			let arrDatas = (await this.$api.GetQueryCriteria()).data
			this.floordata = arrDatas.floors
			this.classdata = arrDatas.crClass
			this.floordata.unshift(0)
			this.classdata.unshift(0)
			this.buildnumb = arrDatas.buildings
			this.getDevDataList()
			this.mqttC = this.$mqtt.message("ZHZM/Result/#", (topic, msg) => {
				console.log(msg);
				if (!this.classShow)
					this.throttle(300);
			})
		},
		methods: {
			classShowChange(e) {
				this.classShow = e.show
				if (this.classShow == false) {
					this.throttle(300);
				}
				console.log(e);
			},
			throttle(delay) {
				// if (!this.timeoutId) {
					if(this.timeoutId){
						clearTimeout(this.timeoutId)
					}
					this.timeoutId = setTimeout(() => {
						// console.log("触发");
						this.getDevDataList(true)
						clearTimeout(this.timeoutId)
					}, delay);
				// }
			},
			// 获取设备列表
			async getDevDataList(silence = false) {
				// this.getDevDataListEvent()
				// console.log(this.floorSelect, this.classSelect, this.buildno);
				let params = {}
				if (this.floorSelect) {
					params.floor = this.floorSelect
				}
				if (this.classSelect) {
					params.crClass = this.classSelect
				}
				if (this.buildno) {
					params.building = this.buildno
				}
				console.log(params, silence);
				this.classlist = (await this.$api.GetClassroomList(params, silence)).data
				// console.log(this.classlist);
			},
			// 改变楼层事件
			handleOnFloorClick(item) {
				this.floorSelect = item;
				this.getDevDataList()
			},
			// 改变班级事件
			handleOnClassClick(item) {
				this.classSelect = item;
				this.getDevDataList()
			},
			// 改变楼栋事件
			getBuildNumb(builddata) {
				this.buildno = builddata
				this.getDevDataList()
			},
			// 改变班级/楼层选项事件
			fandcChange(e) {
				this.fandcType = e
			},
			// 退出登录
			exitToindex() {
				// TODO：清除登录信息
				// uni.removeStorageSync('loginData');
				uni.reLaunch({
					url: '/pages/login/login?loginFlag=1'
				});
			},

			open() {
				this.$refs.popup.open('center')
			},
			closePop(){
				console.log("clloosseeopop");
				this.$refs.popup.close()
			},

			onClickImage_1(parmas) {
				if (parmas.dstOnline == 0) {
					uni.showToast({
						icon: 'none',
						duration: 2000,
						title: "设备离线，请检查设备",
						position:"bottom"
					})
				} else {
					this.sendlist = {
						dstId: parmas.dstId,
						classname: parmas.dstName
					}

					this.open()
				}
			},
			showDrawer(e) {
				this.$refs[e].open()
			},

			setAllLightstatus(state) {
				this.$api.SetAllGatewayDeviceControl({
					action: state
				})
			},
			setLightstatus(item, state) {
				
				if (item.dstOnline == 0) {
					uni.showToast({
						icon: 'none',
						duration: 2000,
						title: "设备离线，请检查设备",
						position:"bottom"
					})
					return
				}
				this.$api.SetGatewayDeviceControl({
					action: state,
					dstId: item.dstId,
					dnNodeIdx: 0
				})

			},

			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
		},

		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs.showLeft.close()
			} else {
				this.$refs.showLeft.open()
			}
		},
		// app端拦截返回事件 ，仅app端生效
		onBackPress() {
			if (this.showRight || this.showLeft) {
				this.$refs.showLeft.close()
				this.$refs.showRight.close()
				return true
			}
		}
	};
</script>

<style scoped lang="css">
	@keyframes mymove {
		from {
			transform: scale(2);
		}

		to {
			transform: scale(1);
		}
	}

	@-moz-keyframes mymove

	/* Firefox */
		{
		from {
			transform: scale(2);
		}

		to {
			transform: scale(1);
		}
	}

	@-webkit-keyframes mymove

	/* Safari 和 Chrome */
		{
		from {
			transform: scale(2);
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
			transform: scale(0.75);
		}
	}

	#closeInfo {
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

	.vielow {
		margin-top: 40px;
		display: flex;
		justify-content: space-around;
		font-size: 18px;
	}



	.image_drawer2 {
		margin-top: 5%;
		margin-left: 5vh;
		margin-right: 5vh;
		width: 82%;
		height: 2vh;
		border-top: solid white;
		vertical-align: text-bottom;
		size: 1;
		border-style: dotted;
	}

	.image_drawer3 {
		margin-top: 5%;
		margin-left: 3vh;
		/* margin-right: 5vh; */
		width: 90%;
		height: 2vh;
		border-top: solid white;
	}

	.group_1 {
		position: relative;
	}

	.grid-item {
		transform: scale(0.9);
		padding-bottom: 2.08vw;
		border-radius: 0.78vw;
		width: 17.14vw;
		/* height: 17.14vw; */
		height: 15.63vw;
		position: relative;
	}

	.pop {
		transform: scale(0.75);
	}

	.grid-item_1 {
		padding-bottom: 2.08vw;
		border-radius: 0.78vw;
		width: 17.08vw;
		height: 15.63vw;
		position: relative;
	}

	.image_10 {
		border-radius: 0.78vw;
		width: 17.14vw;
		/* height: 17.14vw; */
		height: 15.63vw;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.info-content {
		padding: 5px 15px;
	}

	.drawer_in {
		display: flex;

		flex-direction: row;

		align-items: center;
	}

	.image_18 {
		border-radius: 0.78vw;
		width: 17.08vw;
		height: 15.63vw;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.text-wrapper {
		padding: 0.83vw 0 0.94vw;
		background-color: #1e9fff;
		border-radius: 0.78vw 0.78vw 0px 0px;
		width: 17.14vw;
	}

	.text_6 {
		color: #ffffff;
		font-size: 1.31vw;
		font-family: Source Han Sans SC;
		line-height: 1.08vw;
	}

	.image_drawer {

		width: 5vh;
		height: 5vh;
		margin-left: 30%;
		/* margin: auto;
		display: block; */
		margin-top: 10%;
	}

	.text_drawer {
		margin-top: 15%;
		margin-right: 30%;
		color: #f3f3f3;

		font-family: Source Han Sans SC;

		letter-spacing: 0.13vw;
	}

	.text_10 {
		margin-left: 0.94vw;
		color: #ffffff;
		font-size: 1.09vw;
		font-family: Source Han Sans SC;
		line-height: 1.04vw;
	}

	.image_14 {
		margin-left: 0.16vw;
	}

	.image_16 {
		margin-left: 0.16vw;
	}

	.text_8 {
		margin: 0.21vw 0 0.31vw 0.47vw;
		color: #3d3d3d;
		font-size: 1.3vw;
		font-family: Source Han Sans SC;
		line-height: 1.3vw;
		font-weight: bold;
	}

	.image_21 {
		margin-left: 0.16vw;
	}

	.image_23 {
		margin-left: 0.16vw;
	}

	.page {
		width: 100%;
		overflow-y: hidden;
		overflow-x: hidden;
		height: 100%;
		/* position: absolute;s */
	}



	.text_28 {
		margin-left: 4.06vw;
		align-self: center;
		color: #ffffff;
		font-size: 1.88vw;
		font-family: Source Han Sans SC;
		font-weight: 700;
		line-height: 1.41vw;
	}

	.text_29 {
		margin-left: 7.6vw;
		align-self: center;
		color: #ffffff;
		font-size: 1.88vw;
		font-family: Source Han Sans SC;
		font-weight: 700;
		line-height: 1.41vw;
	}

	.text_30 {
		margin-left: 7.6vw;
		align-self: center;
		color: #ffffff;
		font-size: 1.88vw;
		font-family: Source Han Sans SC;
		font-weight: 700;
		line-height: 1.41vw;
	}

	.text_31 {
		margin-left: 7.6vw;
		align-self: center;
		color: #ffffff;
		font-size: 1.88vw;
		font-family: Source Han Sans SC;
		font-weight: 700;
		line-height: 1.41vw;
	}

	.text_32 {
		margin-left: 7.6vw;
		align-self: center;
		color: #ffffff;
		font-size: 1.88vw;
		font-family: Source Han Sans SC;
		font-weight: 700;
		line-height: 1.41vw;
	}

	.text {
		margin-left: 1.77vw;
		align-self: center;
		color: #ffffff;
		font-size: 1.82vw;
		font-family: Source Han Sans SC;
		font-weight: 300;
		line-height: 1.67vw;
	}

	.text-wrapper_1 {
		padding: 0.83vw 0 0.94vw;
		background-color: #afafad;
		border-radius: 0.78vw 0.78vw 0px 0px;
		width: 17.14vw;
	}

	.text_27 {
		color: #ffffff;
		font-size: 1.88vw;
		font-family: Source Han Sans SC;
		font-weight: 700;
		line-height: 1.41vw;
	}

	.image_4 {
		margin-left: 0;
	}

	.text_1 {
		margin-left: 0.57vw;
		align-self: center;
		color: #f3f3f3;
		font-size: 1.25vw;
		font-family: Source Han Sans SC;
		line-height: 1.2vw;
		letter-spacing: 0.13vw;
	}

	.text_2 {
		margin-left: 0.47vw;
		align-self: center;
		color: #f3f3f3;
		font-size: 1.25vw;
		font-family: Source Han Sans SC;
		line-height: 1.25vw;
		letter-spacing: 0.13vw;
	}

	.text_3 {
		margin-left: 0.36vw;
		align-self: center;
		color: #f3f3f3;
		font-size: 1.25vw;
		font-family: Source Han Sans SC;
		line-height: 1.2vw;
		letter-spacing: 0.13vw;
	}

	.text_4 {
		margin-left: 1.25vw;
		margin-top: 1.46vw;
		color: #f3f3f3;
		font-size: 1.25vw;
		font-family: Source Han Sans SC;
		line-height: 1.25vw;
		letter-spacing: 0.13vw;
	}

	.text_tab {
		margin-left: 43%;
		margin-top: 1.46vw;
		color: #ffffff;
		font-size: 1.5vw;
		font-family: Source Han Sans SC;
		line-height: 2.25vw;
		letter-spacing: 0.13vw;
		justify-content: center;
	}

	.text_tab1 {
		margin-left: 40%;
		margin-top: 1.46vw;
		color: #ffffff;
		font-size: 1.5vw;
		font-family: Source Han Sans SC;
		line-height: 2.25vw;
		letter-spacing: 0.13vw;
		justify-content: center;
	}

	.text_tab2 {
		margin-left: 40%;
		margin-top: 1.46vw;
		color: #ffffff;
		font-size: 1.5vw;
		font-family: Source Han Sans SC;
		line-height: 2.25vw;
		letter-spacing: 0.13vw;
		justify-content: center;
	}

	.text_tab3 {
		margin-left: 37%;
		margin-top: 1.46vw;
		color: #ffffff;
		font-size: 1.5vw;
		font-family: Source Han Sans SC;
		line-height: 2.25vw;
		letter-spacing: 0.13vw;
		justify-content: center;
	}

	.text_5 {
		margin-left: 1.15vw;
		margin-top: 1.46vw;
		color: #f3f3f3;
		font-size: 1.25vw;
		font-family: Source Han Sans SC;
		line-height: 1.25vw;
		letter-spacing: 0.13vw;
	}

	.image_36 {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.section_1 {
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.image_37 {
		mix-blend-mode: multiply;
		width: 100vw;
		height: 100vh;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.section_2 {
		padding: 0.73vw 2.29vw 0 4.38vw;
		background-color: #04125b5e;
	}



	.group_2 {
		margin-top: 0.21vw;
	}


	.group_12 {
		padding: 1.46vw 0;
		width: 10.31vw;
		position: relative;
	}

	.image {
		flex-shrink: 0;
		width: 3.85vw;
		height: 3.85vw;
	}

	.group_4 {
		margin-left: 2.19vw;
		margin-top: 0.21vw;
	}

	.group_5 {
		margin-left: 2.19vw;
		margin-top: 0.21vw;
	}

	.group_14 {
		width: 17.19vw;
		position: relative;
	}

	.group_6 {
		margin-top: 2.55vw;
		padding-left: 1.04vw;
		padding-right: 0.83vw;
	}

	.view_24 {
		margin-top: 2.6vw;
	}

	.section_9 {
		/* bottom: 0; */
		/* margin-top: 0; */
		/* width: 100vw; */
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		/* margin: 0, 0, 0; */
		background-color: #04125b5e;
	}

	.section_10 {
		margin: auto;
		transition: .6s;
		padding: 1.46vw 0;
		flex-shrink: 0;
		width: 10.31vw;
		height: 4.32vw;
	}

	.image_1 {
		margin-left: 1.88vw;
		flex-shrink: 0;
		width: 4.32vw;
		height: 4.32vw;
	}

	.image_5 {
		flex-shrink: 0;
		filter: drop-shadow(0px 0.31vw 0.52vw #ff393280);
		width: 3.44vw;
		height: 3.39vw;
	}

	.text_17 {
		margin-left: 0.99vw;
		color: #ffffff;
		font-size: 1.09vw;
		font-family: Source Han Sans SC;
		line-height: 1.04vw;
	}

	.group_8 {
		margin-top: 1.82vw;
		padding: 0 0.73vw;
	}

	.view_25 {
		margin-top: 1.77vw;
	}

	.divider {
		margin-top: 0.42vw;
		background-color: #c5c6c7;
		height: 0.1vw;
	}
	.dividerb{
		margin-top: 0.42vw;
		background-color: #1e9fff;
		height: 0.1vw;
	}

	.text_36 {
		margin-left: 0.99vw;
	}

	.group_7 {
		padding: 0 5vw;
	}

	.text_37 {
		margin: 0.21vw 0 0.31vw 0.47vw;
		color: #29343f;
		font-size: 0.73vw;
		font-family: Source Han Sans SC;
		line-height: 0.73vw;
	}

	.text_12 {
		margin-left: 0.94vw;
	}

	.group_24 {
		width: 17.14vw;
		position: relative;
	}

	.group_9 {
		padding: 0 0.26vw;
	}

	.group_10 {
		margin-top: 1.82vw;
		padding: 0 0.78vw;
	}

	.image_8 {
		z-index: 99;
		transform: scale(1.5);
		flex: 1 1 4.64vw;
		width: 4.64vw;
		height: 5.04vw;
		/* height: 4.58vw; */
	}

	.image_26 {
		margin-left: 0.16vw;
	}

	.image_27 {
		margin-left: 0.16vw;
	}

	.section_6 {
		background-color: #afafad;
		border-radius: 0.1vw;
		width: 0.42vw;
		height: 1.8vw;
	}

	.text_34 {
		margin: 0.21vw 0 0.31vw 0.47vw;
		color: #29343f;
		font-size: 0.73vw;
		font-family: Source Han Sans SC;
		line-height: 0.73vw;
	}

	.section_3 {
		background-color: #1e9fff;
		border-radius: 0.1vw;
		width: 0.42vw;
		height: 1.8vw;
	}

	.main-scroll {
		width: 100%;

	}

	.grid {
		/* margin-left: 1vw; */
		align-self: center;
		width: 100%;
		height: calc(83.89vh - 50px);
		display: grid;
		grid-template-columns: repeat(5, 0fr);
		/* row-gap: 4.95vw;
		column-gap: 5.63vw; */
		/* row-gap: 2vw; */
		/* column-gap: 2vw; */
		justify-content: center;

	}
</style>