<template>
	<view class="flex-col page">
		<view class="flex-col items-center group_4">
			<image src="/static/image/16599373488541923481.png" class="image_10" />
			<view class="flex-col section_1">
				<image src="/static/image/16599373488648318759.png" class="image_11" />
				<view class="flex-col items-end group_4">
					<view class="flex-col items-center section_2">
						<image src="/static/image/16599373488645083814.png" class="image_12" />
						<view class="flex-col group_6">
							<view class="flex-col section_3">
								<text class="text">更改IP</text>
								<view class="flex-col group_1">
									<view class="flex-col items-start text-wrapper">
										<input class="text_1" v-model="uip" placeholder="IP地址：192.168.1.56"
											@input="onKeyInput8" />
									</view>
									<!-- <view class="flex-col items-start text-wrapper view_1">
										<text class="text_1">端口号：8980</text>
									</view> -->
								</view>
								<view class="flex-col items-center button" @click="onClickImage_2()">
									<text class="text_4">更改</text>
								</view>
							</view>
							<text class="text_5">华夏光电</text>
						</view>
					</view>
					<view class="justify-between section_4">
						<view class="flex-row">
							<image src="/static/image/16599375594699934900.png" class="image" />
							<text class="text_6">智慧照明平台后台管理系统</text>
						</view>
						<image src="/static/image/back.png" class="image_1" @click="onClickImage_1()"/>
					</view>
					<text class="text_7">智慧照明平台</text>
					<image src="/static/image/16599373488653252007.png" class="image_2" />
					<image src="/static/image/16599373488651081606.png" class="image_3" />
					<image src="/static/image/16599373494165298376.png" class="image_4" />
					<view class="flex-col section_5">
						<image src="/static/image/16599373496529821560.png" class="image_13" />
						<view class="flex-col items-center group_8">
							<image src="/static/image/16599373496653323790.png" class="image_5" />
							<image src="/static/image/16599373497495974285.png" class="image_6" />
						</view>
					</view>
					<image src="/static/image/16599373497632352157.png" class="image_7" />
					<view class="flex-col items-center image-wrapper">
						<image src="/static/image/16599373498432266640.png" class="image_14" />
						<image src="/static/image/d3df85f85fb4f88e3359332820b21688.png" class="image_8" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				uip: ''
			};
		},
		onLoad: function(options) {
			this.getkeyip()
		},
		methods: {
			getkeyip() {
				uni.getStorage({
					key: 'id',
					// success(res) {
					// 	console.log("获取数据成功", res.data)
					// 	this.uip = res.data
					// }.bind(this)
					success: function(res) {
						console.log(res.data);
						this.uip = res.data
					}.bind(this),
				})
			},
			isValidIP() {
				var reg =
					/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
				return reg.test(this.uip);
			},
			onKeyInput8: function(event) {
				this.uip = event.target.value
				console.log(this.uip)
			},
			onClickImage_1() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			onClickImage_2() {
				this.isValidIP()
				if (this.isValidIP() == false) {
					uni.showToast({
						icon: 'none',
						duration: 2000,
						title: "IP错误",
						position:"bottom"
					})
				} else {
					uni.navigateTo({
						url: '/pages/infomate/infomate?IpAddress=' + this.uip
					});
					uni.setStorage({
						key: 'id',
						data: this.uip,
						success() {
							console.log('存储成功')
						}
					})
				}

			},
			handleInput() {
				if (Number(this.valueScore) > this.score) {
					this.valueScore = this.score;
				} else if (Number(this.valueScore) < 0) {
					this.valueScore = 0;
				}
			},
		},
	};
</script>

<style scoped lang="css">
	.text-wrapper {
		padding: 0.99vw 0 0.83vw;
		background-color: #ffffff80;
		border-radius: 0.26vw;
		width: 20.94vw;
	}

	.text_1 {
		margin-left: 1.04vw;
		color: #333333;
		font-size: 1.15vw;
		font-family: Source Han Sans SC;
		font-weight: 300;
		line-height: 1.04vw;
	}

	.page {
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	.text_7 {
		color: #ffffff;
		font-size: 2.5vw;
		font-family: Source Han Sans SC;
		line-height: 2.29vw;
		letter-spacing: 0.75vw;
		position: absolute;
		left: 20.05vw;
		top: 14.84vw;
	}

	.group_8 {
		margin-left: 0.31vw;
		margin-right: 0.21vw;
		padding: 0.57vw 0 0.83vw;
		width: 17.29vw;
		position: relative;
	}

	.text_5 {
		margin-top: 10.05vw;
		align-self: flex-start;
		color: #ffffff;
		font-size: 1.2vw;
		font-family: Source Han Sans SC;
		line-height: 1.15vw;
		letter-spacing: 0.36vw;
	}

	.text_6 {
		margin-left: 1.77vw;
		align-self: center;
		color: #ffffff;
		font-size: 1.82vw;
		font-family: Source Han Sans SC;
		font-weight: 300;
		line-height: 1.67vw;
	}

	.text {
		align-self: center;
		color: #ffffff;
		font-size: 2.08vw;
		font-family: Source Han Sans SC;
		line-height: 1.88vw;
		letter-spacing: 0.21vw;
	}

	.button {
		margin-top: 3.75vw;
		padding: 0.68vw 0;
		align-self: center;
		background-color: #455de4;
		box-shadow: 0px 0.1vw 0.47vw #455de4;
		border-radius: 1.17vw;
		width: 14.9vw;
	}

	.text_4 {
		color: #ffffff;
		font-size: 1.04vw;
		font-family: Source Han Sans SC;
		line-height: 0.99vw;
		letter-spacing: 0.1vw;
	}

	.group_4 {
		position: relative;
	}

	.image_10 {
		width: 100vw;
		height: 56.25vw;
		position: relative;
	}

	.section_1 {
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.image_11 {
		mix-blend-mode: multiply;
		width: 100vw;
		height: 56.25vw;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.section_2 {
		padding: 17.5vw 0 2.6vw;
		width: 78.49vw;
		height: 56.25vw;
		position: relative;
	}

	.section_4 {
		padding: 0.73vw 1.15vw 0.73vw 4.38vw;
		background-color: #ffffff1a;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
	}

	.image_2 {
		width: 22.19vw;
		height: 9.06vw;
		position: absolute;
		left: 18.39vw;
		bottom: 12.24vw;
	}

	.image_3 {
		width: 26.25vw;
		height: 10.73vw;
		position: absolute;
		left: 16.3vw;
		bottom: 11.3vw;
	}

	.image_4 {
		width: 26.25vw;
		height: 10.73vw;
		position: absolute;
		left: 16.3vw;
		bottom: 17.03vw;
	}

	.section_5 {
		padding: 0.36vw 0 0.47vw;
		width: 17.81vw;
		height: 6.88vw;
		position: absolute;
		left: 20.47vw;
		top: 35.47vw;
	}

	.image_7 {
		width: 20.21vw;
		height: 15.47vw;
		position: absolute;
		left: 19.43vw;
		bottom: 17.24vw;
	}

	.image-wrapper {
		width: 22.03vw;
		position: absolute;
		left: 18.54vw;
		top: 18.54vw;
	}

	.image_14 {
		width: 22.03vw;
		height: 21.2vw;
	}

	.image_12 {
		width: 78.49vw;
		height: 56.25vw;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.group_6 {
		width: 38.44vw;
		position: relative;
	}

	.image_1 {
		margin: 0.52vw 0 0.31vw;
		width: 3.23vw;
		height: 3.02vw;
	}

	.image_13 {
		width: 17.81vw;
		height: 6.88vw;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.image_8 {
		width: 19.53vw;
		height: 15.78vw;
		position: absolute;
		left: 0.89vw;
		top: 1.61vw;
	}

	.section_3 {
		padding: 2.71vw 3.39vw 4.17vw 4.43vw;
		align-self: flex-end;
		background-color: #001478a8;
	}

	.image {
		flex-shrink: 0;
		width: 3.85vw;
		height: 3.85vw;
	}

	.image_5 {
		width: 12.03vw;
		height: 4.64vw;
	}

	.image_6 {
		width: 17.29vw;
		height: 6.04vw;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.group_1 {
		margin-top: 2.66vw;
	}

	.view_1 {
		margin-top: 1.72vw;
	}
</style>
