<template>
	<view class=" flex-col section_34846" id="openInfo">
		<text class="text1233124">更改IP</text>
		<view class=" group_11234">
			<view class=" text-wrapper123412">
				<input class="text_14215" v-model="uip" placeholder="IP地址：192.168.1.56" @input="onKeyInput8" />
			</view>
		</view>
		<view class="flex-col items-center button12421" @click="onClickImage_2()">
			<text class="text_4124">更改</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "settingClick",
		
		data() {
			return {
				uip:''
			};
		},
		created() {
			this.getkeyip()
		},
		methods: {
			getkeyip() {
				uni.getStorage({
					key: 'id',
					success: function(res) {
						console.log(res.data);
						this.uip = res.data
					}.bind(this)
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
	.text-wrapper123412 {
		padding: 0.99vw 0 0.83vw;
		background-color: #ffffff80;
		border-radius: 0.26vw;
		width: 20.94vw;
	}

	.text_14215 {
		margin-left: 1.04vw;
		color: #333333;
		font-size: 1.15vw;
		font-family: Source Han Sans SC;
		font-weight: 300;
		line-height: 1.04vw;
	}

	.text1233124 {
		align-self: center;
		color: #ffffff;
		font-size: 2.08vw;
		font-family: Source Han Sans SC;
		line-height: 1.88vw;
		letter-spacing: 0.21vw;
	}

	.button12421 {
		margin-top: 3.75vw;
		padding: 0.68vw 0;
		align-self: center;
		background-color: #455de4;
		box-shadow: 0px 0.1vw 0.47vw #455de4;
		border-radius: 1.17vw;
		width: 14.9vw;
	}

	.text_4124 {
		color: #ffffff;
		font-size: 1.04vw;
		font-family: Source Han Sans SC;
		line-height: 0.99vw;
		letter-spacing: 0.1vw;
	}

	.section_34846 {
		border-radius: 15rpx;
		padding: 2.71vw 3.39vw 4.17vw 4.43vw;
		align-self: flex-end;
		background-color: #001478a8;
	}

	.group_11234 {
		margin-top: 2.66vw;
		margin-left: 15%;
	}
</style>
