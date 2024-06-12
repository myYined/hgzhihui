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
						<view class="view_grid">
							<view class="view_grid-item" v-for="index in 4" :key="index">
								<view class="" style="padding: 7%;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<text style="font-weight: 700;font-size: 2.595vw;">教室总数</text>
										<image style="width: 4vw;height: 2.5vh;" src="../../static/image/classroomSum.jpg" mode=""></image>
									</view>
									<view style="display: flex;justify-content: space-between;align-items: flex-end;;margin-top: 1vh;">
										<text style="color: #3778FE;font-weight: 700;font-size: 4.595vw;">102</text>
										<text style="margin-bottom: 0.5vh;margin-right: 1vw;;font-size: 2.75vw;">间</text>
									</view>
									<view style="margin-top: 1vh;">
										<view style="background: #3778FE;border-radius: 3vw;color: #fff;text-align: center;font-size: 2.75vw;padding: 0.5vh 0;">
											完成比例<text style="color: red;margin-left: 1.5vw;">37%</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="view_day">
							<view>前一天</view>
							<view>
								
							</view>
							<view>
								后一天
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="footer_img">
					<tab :count="0"></tab>
				</view>
				<!-- <image src="../../static/image/home_footer.png" mode=""></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				gridList:[]
			}
		},
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
					margin: 1.5vh 6vw;
					
					.view_content{
						display: inline-block;
						height: calc(100vh - 7vh - 16vh);
						width: calc(100vw - 12vw);
						background-color: #fff;
						border-radius: 2vw;
						.view_grid{
							padding: 5% 6%;
							display: flex;
							flex-wrap: wrap;
							height: 32vh;
							align-content: space-between;
							justify-content: space-between;
							.view_grid-item{
								box-sizing: border-box;
								width: 46%;
								height: 14.5vh;
								border: #3778FE 2px solid;
								border-radius: 1.5vw;
							}
						}
						.view_day{
							padding: 3% 6%;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #3778FE;
							view{
								border: 1px solid #3778FE;
								padding: 0.5vh 4vw;
								border-radius: 3.2vw;
							}
						}
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