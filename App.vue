<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			plus.screen.lockOrientation('portrait-primary');
			// plus.screen.lockOrientation('landscape-primary'); //锁定
			plus.navigator.hideSystemNavigation()
			plus.navigator.setFullscreen(true);
			uni.hideTabBar()
			console.log(uni.getSystemInfoSync(),'系统');
			const {deviceType}= uni.getSystemInfoSync()
			uni.setStorage({
				key:'deviceType',
				data:{
					type:deviceType
				}
			})
			// this.$mqtt.launch('wxs://storage.swnpower.com/mqtt')
		},
		onLoad() {
			uni.hideTabBar()
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
	};
</script>

<style>
	/************************************************************
  ** 请将全局样式拷贝到项目的全局 CSS 文件或者当前页面的顶部 **
  ** 否则页面将无法正常显示                                  **
  ************************************************************/

	html {
		width: 100vw;
		height: 100vh;
		font-size: 16px;
	}

	body {
		width: 100vw;
		height: 100vh;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
			'Droid Sans', 'Helvetica Neue', 'Microsoft Yahei', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	view,
	image,
	{
		box-sizing: border-box;
		flex-shrink: 0;
	}

	#app {
		width: 100vw;
		height: 100vh;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.justify-start {
		display: flex;
		justify-content: flex-start;
	}

	.justify-center {
		display: flex;
		justify-content: center;
	}

	.justify-end {
		display: flex;
		justify-content: flex-end;
	}

	.justify-evenly {
		display: flex;
		justify-content: space-evenly;
	}

	.justify-around {
		display: flex;
		justify-content: space-around;
	}

	.justify-between {
		display: flex;
		justify-content: space-between;
	}

	.items-start {
		display: flex;
		align-items: flex-start;
	}

	.items-center {
		display: flex;
		align-items: center;
	}

	.items-end {
		display: flex;
		align-items: flex-end;
	}
</style>
