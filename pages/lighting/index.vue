<template>
	<view class="index">
		<image class="index_img" src="../../static/image/home_img.jpg" mode=""></image>
		<view class="main">
			<view class="header">
				<my-header/>
			</view>
			<view class="section">
				<view class="section_view">
					<view class="view_content">
						灯光
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="footer_img">
					<tab :count="1"></tab>
				</view>
				<!-- <image src="../../static/image/home_footer.png" mode=""></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad() {
			uni.hideTabBar()
		}
	}
</script>

<style scoped lang="scss">
	.index{
		position: relative;
		height: 100vh;
		.index_img{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 0;
		}
		.main{
			position: relative;
			z-index: 1;
			.section{
				.section_view{
					margin: 1.5vh 5vw;
					
					.view_content{
						display: inline-block;
						height: calc(100vh - 7vh - 16vh);
						width: calc(100vw - 12vw);
						background-color: #fff;
						border-radius: 2vw;
					}
				}
			}
			.footer{
				position: fixed;
				bottom: 0;
				right: 0;
				left: 0;
				.footer_img{
					width: 92vw;
					margin: 0 auto;
				}
			}
		}
	}
</style>