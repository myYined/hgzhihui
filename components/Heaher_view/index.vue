<template>
	<view class="index header">
<<<<<<< HEAD
		<view class="nav_view">
			<view class="nav_page">
				<view class="nav_left">
					<view class="date_text">
						<text>{{currentTime.slice(0,2)}}</text>
						<text style="font-size: 2vw;margin: 0 0.6vw;opacity: 0.4;">|</text>
						<text>{{currentTime.slice(3,5)}}</text>
					</view>
					<view class="weather">
						<image src="@/static/image/All-closed.png" mode=""></image>
						<text>{{currentDate}}</text>
					</view>
				</view>
				<view class="nav_content">
					{{title}}
				</view>
				<view class="nav_right" @click="choiceChange">
					<image src="../../static/image/16599375594699934900.png" mode=""></image>
					<view class="nav_right_choice">
						<view class="_list" :style="choiceStyle">
							<view class="_item" v-for="(val,index) in choice" :key="index">
								<image :src="val.img" mode=""></image>
								<text>{{val.name}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
export default{
	data(){
		return{
			currentTime:moment().format('HH:mm'),//时间
			currentDate:moment().format('YYYY/MM/DD'),//日期
			title:'第二十四中学',//标题
			choice:[
				{
					name:'全开',
					img:'../../static/image/allOpen.png',
				},
				{
					name:'全关',
					img:'../../static/image/All-closed.png'
				}
			],//下拉框
			isChoice:false,
			choiceStyle:{
				height:'0vh',
				opacity:0,
				overflow: 'auto'
			}
		}
	},
	mounted() {
		this.getCurrentTime()
	},
	methods:{
		choiceChange(){
			this.isChoice = !this.isChoice
			if(this.isChoice){
				this.choiceStyle.height = '18vh';
				setTimeout(()=>{
					this.choiceStyle.opacity = 1
				},10)
			}else{
				this.choiceStyle.height = '0vh';
				setTimeout(()=>{
					this.choiceStyle.opacity = 0
				},10)
			}
		},
		getDate(){
			return moment().format('HH:mm')
		},
		getCurrentTime(){
			setInterval(()=>{
				// new Date().toLocaleTimeString().slice(0,5)
				this.currentTime  = this.getDate()
			},1000)
		}
	}
}
</script>

<style scoped lang="scss">
	.index{
		position: relative;
		height: 7vh !important;
		.nav_view{
			.nav_page{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 6.58vh !important;
				padding: 0 3vw;
				color: #fff;
				.nav_left{
					display: flex;
					justify-content: center;
					align-items: center;
					.date_text{
						font-size: 3.43vh;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.weather{
						display: flex;
						flex-direction: column;
						justify-content: center;align-items: center;
						padding-top: 0.35vh;
						margin-left: 0.65vw;
						image{
							width: 4.84vw;
							height: 3vh;
						}
						text{
							font-size: 0.95vw;
							opacity: 0.6;
						}
					}
				}
				.nav_content{
					font-size: 2.03vh;
					margin-right: 12vw;
				}
				.nav_right{
					margin-top: 0.3vh;
					position: relative;
					image{
						width: 6.5vw;
						height: 4vh;
					}
					.nav_right_choice{
						position: absolute;
						top: 4vh;
						left: -1vw;
						._list{
							background-color: #3857A9;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							padding: 0 1vw;
							box-sizing: border-box;
							border-bottom-left-radius: 4vw;
							border-bottom-right-radius: 4vw;
							height: 0;
							transition: height .1s;
							._item{
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								font-size: 1.8vw;
								&:first-child{
									margin-bottom: 2vh;
									margin-top: 3vh;
								}
								&:last-child{
									margin-bottom: 3vh;
								}
							}
						}
					}
				}
			}
		}
	}
=======
		heder
	</view>
</template>

<script setup>
</script>

<style scoped lang="scss">
	
>>>>>>> 1c4ff1f79fae2a8429b11e5ae78a9fa14db2439c
</style>