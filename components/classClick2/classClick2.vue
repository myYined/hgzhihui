<template>
	<view class="section_300" id="openInfo">
		<view class="text-wrapper123">
			<text class="text_600">开关灯光</text>
			<view @click="$emit('closePop')" class="text_600x">×</view>
		</view>
		<image src="/static/image/16599387354366087480.png" class="image_1000" />
		<view class="main-box">
			<view @click="setLightstatus(1)" class="main-box-item">
				<image src="/static/image/allOpen.png" class="image_100"></image>
				<text class="text_6000">开</text>
			</view>
			<view @click="setLightstatus(0)" class="main-box-item">
				<image src="/static/image/allOff.png" class="image_100"></image>
				<text class="text_6000g">关</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["arrays", "classname"],
		name: 'classClick',
		components: {},
		methods: {
			setLightstatus(state) {
				this.$api.SetGatewayDeviceControl({
					action: state,
					dstId: this.arrays,
					dnNodeIdx: 0
				}).then(() => {
					this.$emit("closePop")
				})
			},
		}
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
/* 		animation: mymove 0.6s infinite;
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
		-o-animation-iteration-count: 1; */
	}

	.section_300 {
		border-radius: 0.78vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 60vw;
		height: 50vh;
		/* width: 60vw; */
		/* align-items: center; */
		/* width:60vw; */
	}

	.image_1000 {
		border-radius: 0.78vw;
		width: 60vw;
		height: 50vh;
		/* top: 0; */
		/* right: 0; */
		/* bottom: 0; */
		/* left: 0; */
		position: absolute;
	}

	.image_100 {
		width: 12vw;
		height: 12vw;
		/* height: 30vw; */
		/* top: 0; */
		/* right: 0; */
		/* bottom: 0; */
		/* left: 0; */
		/* position: absolute; */
	}

	.group_100 {
		/* top: 10vw; */
		/* position: relative; */
	}


	.text-wrapper123 {
		/* position: fixed; */
		z-index: 999;
		display:flex;
		flex-direction: row;
		justify-content: space-between;
		width: 60vw;
		padding: 1.67vw 0;
		background-color: #1e9fff;
		border-radius: 0.78vw 0.78vw 0px 0px;
	}

	.text_600 {
		margin-left: 1.77vw;
		color: #ffffff;
		font-size: 1.56vw;
		font-family: Source Han Sans SC;
		line-height: 1.51vw;
		font-weight: bold;
	}

	.text_600x {
		margin-right: 1.77vw;
		color: #ffffff;
		font-size: 1.56vw;
		font-family: Source Han Sans SC;
		line-height: 1.51vw;
	}

	.main-box {
		height: 50vh;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.main-box-item {
		/* margin: auto; */
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.text_6000 {
		z-index: 999;
		color: #1e9fff;
		font-size: 3vw;
		font-family: Source Han Sans SC;
		/* line-height: 1.51vw; */
		font-weight: bold;
	}

	.text_6000g {
		z-index: 999;
		color: #acadac;
		font-size: 3vw;
		font-family: Source Han Sans SC;
		/* line-height: 1.51vw; */
		font-weight: bold;
	}
</style>