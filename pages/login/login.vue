<template>
	<view class="index">
		<image class="index_img" src="../../static/image/logo.jpg" mode=""></image>
		<view class="group_1">
			<view class="header">
				<view class="nav">
					<view class="nav_right"  @click="open()">
						<image src="../../static/image/installed.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="section">
				<view class="main">
					<form class="_form"  @submit="formSubmit">
						<view class="_input_user">
							<view class="user_pnt">
								<view class="imgview">
									<image src="../../static/image/272727-user.png" mode=""></image>
								</view>
								<view class="vertical">
									<image src="../../static/image/272727.png" mode=""></image>
								</view>
								<view class="_input">
									<input type="text" v-model="iUsername" placeholder="请输入用户名" name="" id="">
								</view>
							</view>
						</view>
						<view class="_input_pass">
							<view class="pass_pnt">
								<view class="imgview">
									<image src="../../static/image/272727-pass.png" mode=""></image>
								</view>
								<view class="vertical">
									<image src="../../static/image/272727.png" mode=""></image>
								</view>
								<view class="_input">
									<input v-model="iPassword" placeholder="请输入密码"  type="password" />
								</view>
							</view>
							<view class="remember_pass">
								<view class="checkbox_view"  @click="onChange">
									<checkbox class="checkbox" value="cb" :checked="checked" />
									<text>记住密码</text>
								</view>
							</view>
						</view>
						<view class="but">
							<button class="button" form-type="submit"  type="primary">
								<text>登&nbsp;&nbsp;&nbsp;录</text>
							</button>
						</view>
					</form>
					<view class="hx">
						<text>华&nbsp;&nbsp;夏&nbsp;&nbsp;光&nbsp;&nbsp;电</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 普通弹窗 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="服务器地址" :value="uUrl" placeholder="https://www.api.com/api"
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="inputDialog1" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="MQTT服务器地址" :value="uIp" placeholder="192.168.1.1"
				@confirm="dialogInputConfirm1"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="inputDialog2" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="MQTT用户名" :value="uUsername" placeholder="请输入MQTT用户名"
				@confirm="dialogInputConfirm2"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="inputDialog3" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="MQTT密码" :value="uPassword" placeholder="请输入MQTT密码"
				@confirm="dialogInputConfirm3"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: "",
				uIp: '',
				uUrl: '',
				uUsername: "sml_control",
				uPassword: "jseb_control",
				iUsername: "",
				iPassword: "",
				autoLogin: true,
				form: {},
				checked:false
			};
		},
		onLaunch: () => {
			plus.screen.lockOrientation('portrait-primary');
		},
		onLoad: function(options) {
			if (options.loginFlag == '1') {
				this.autoLogin = false
			}
			this.getkeyip()
			plus.runtime.getProperty(plus.runtime.appid, (info) => {
				console.log(JSON.stringify(info));
				this.version = info.version;
				// this.versionCode = info.versionCode ;
			})
		},
		// onShow() {
		// 	this.getkeyip()
		// },
		methods: {
			dialogInputConfirm(e) {
				this.uUrl = e
				this.$refs.inputDialog.close()
				this.$refs.inputDialog1.open()
			},
			dialogInputConfirm1(val) {

				if (this.isValidIP(val)) {
					this.uIp = val
					this.$refs.inputDialog1.close()
					this.$refs.inputDialog2.open()
				} else {
					uni.showToast({
						icon: 'none',
						duration: 2000,
						title: "地址格式有误",
						position:"bottom"
					})
				}
			},
			dialogInputConfirm2(e) {
				this.uUsername = e
				this.$refs.inputDialog2.close()
				this.$refs.inputDialog3.open()
			},
			dialogInputConfirm3(e) {
				this.uPassword = e
				this.$refs.inputDialog3.close()
				uni.setStorage({
					key: 'connectData',
					data: {
						uUrl:this.uUrl,
						uIp: this.uIp,
						uUsername: this.uUsername,
						uPassword: this.uPassword
					},
					success() {
						console.log('存储成功')
					}
				})
			},
			open() {
				this.$refs.inputDialog.open()
			},
			getkeyip() {
				uni.getStorage({
					key: 'connectData',
					success: function(res) {
						this.uUrl = res.data.uUrl
						this.uIp = res.data.uIp
						this.uUsername = res.data.uUsername
						this.uPassword = res.data.uPassword
						if (this.uIp && this.uUsername && this.uPassword) {
							uni.getStorage({
								key: 'loginData',
								success: function(res) {
									console.log(res,'23222');
									if(res.data.checked){
										this.iUsername = res.data.iUsername
										this.iPassword = res.data.iPassword
										this.checked = true
									}
								}.bind(this),
							})
						}
					}.bind(this),
					fail() {
						uni.showToast({
							icon: 'none',
							duration: 2000,
							title: "未检测到连接信息，请设置连接信息",
							position:"bottom"
						})
					}
				})
			},
			isValidIP(ipaddress) {
				var reg =
					/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
				return reg.test(ipaddress);
			},
			formSubmit() {
				if (!this.uUrl || !this.uIp || !this.uUsername || !this.uPassword) {
					uni.showToast({
						icon: 'none',
						duration: 2000,
						title: "请设置连接信息",
						position:"bottom"
					})
					return
				}
				if (!this.iUsername || !this.iPassword) {
					uni.showToast({
						icon: 'none',
						duration: 2000,
						title: "请输入用户名和密码",
					})
					return
				}
				this.login()

			},
			async login() {
				// #ifdef APP
				let url = 'wx://' + this.uIp + ':8083/mqtt'
				// #endif

				// #ifdef H5
				let url = 'ws://' + this.uIp + ':8083/mqtt'
				// #endif
				this.$mqtt.launch({
					url: url,
					checked:this.checked,
					username: this.uUsername,
					password: this.uPassword,
					iUsername: this.iUsername,
					iPassword: this.iPassword
				}, (res) => {
					console.log(res);
				})
			},
			onChange(){
				this.checked = !this.checked

			}
		},
	}
</script>

<style scoped lang="scss">
	.index{
		width: 100%;
		position: relative;
		height: 100vh;
		overflow: auto;
		// background: url("../../static/image/logo.jpg");
		// background-repeat: no-repeat;
		// background-size: 100%;
		.index_img{
			position: absolute;
			z-index: 0;
			width: 100%;
			height: 100%;
		}
		.group_1{
			position: relative;
			.header{
				height: 90rpx;
				.nav{
					display: flex;
					justify-content: flex-end;
					position: relative;
					z-index: 1;
					// background-color: rgba(255, 255, 255, .1);
					// border: 1px solid red;
					.nav_right{
						width: 90rpx;
						display: flex;
						justify-content: center;
						align-content: center;
						$imageSize:35rpx;
						image{
							margin-top: 25rpx;
							display: block;
							width: $imageSize;
							height: $imageSize;
						}
					}
				}
				
			}
			.section{
				// height: calc(100vh - 88rpx);
				// position: relative;
				// border: 2px solid gold;
				.main{
					position: fixed;
					bottom: 0rpx;
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
					width: 100%;
					text-align: center;
					._form{
						._input_user,._input_pass{
							width: 450rpx;
							overflow: hidden;
							margin: 35rpx 0;
							.user_pnt,.pass_pnt{
								border-radius: 5rpx;
								height: 55rpx;
								display: flex;
								align-items: center;
								background-color: rgba(255, 255, 255, .6);
								
								.imgview{
									height: 45rpx;
									width: 60rpx;
									display: flex;
									align-items: center;
									justify-content: center;
									image{
										width: 25rpx;
										height: 30rpx;
									}
								}
								.vertical{
									height: 50rpx;
									width: 3rpx;
									display: flex;
									align-items: center;
									justify-content: center;
									image{
										width: 100%;
										height: 25rpx;
									}
								}
								._input{
									margin-left: 20rpx;
									flex-grow: 1;
									input{
										text-align: left;
									}
								}
							}
							
						}
						.remember_pass{
							margin-top: 15rpx;
							display: flex;justify-content: flex-end;
							.checkbox_view{
								font-size: 18rpx;
								color: #fff;
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}
						.but{
							margin-top: 30rpx;
							.button{
								// background-image: url("../../static/image/logink.png");
								color: #fff;
								width: 280rpx;
								height: 60rpx;
								line-height: 60rpx;
								font-size: 24rpx;
								display: flex;
								justify-content: center;align-items: center;
								border-radius: 20rpx;
								text{
									margin: 0 15rpx;
								}
							}
						}
					}
					.hx{
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						font-size: 20rpx;
						margin-top: 185rpx;
						.hx_img{
							// height: 28rpx;
							// width: 100rpx;
							// margin-top: 105rpx;
						}
					}
				}
				

			}
		}
	} 

::v-deep .uni-checkbox-input{
	width: 20rpx !important;
	height: 20rpx !important;
}
</style>