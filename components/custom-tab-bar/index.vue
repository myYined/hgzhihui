<template>
	<view class="tabBar">
		<view class="_list">
			<view class="_item" v-for="(val,index) in tabbar.list" :key="index" @click="tabChange(index,val.pagePath)">
				<image 
				:src="current==index?val.selectedPage:val.iconPage" 
				:style="imgStyle(index)"
				mode=""></image>
				<text>{{val.text}}</text>
				<!-- <image src="../../static/image/lightOn.png" mode=""></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'tabBar',
		props:{
			count:{
				type:[Number,String],
				default:0
			}
		},
		data(){
			return{
				tabbar:{
					list:[
						{
							pagePath:'/pages/home/home',
							iconPage:'../../static/image/schoolExtinction.png',
							text:'学校',
							selectedPage:'../../static/image/schoolBright.png'
						},
						{
							pagePath:'/pages/lighting/index',
							iconPage:'../../static/image/lightOn.png',
							text:'灯光',
							selectedPage:'../../static/image/schoolBright.png'
						},
						{
							pagePath:'/pages/classromm/index',
							iconPage:'../../static/image/schoolExtinction.png',
							text:'教室',
							selectedPage:'../../static/image/classroomOn.png'
						},
						{
							pagePath:'/pages/my/index',
							iconPage:'../../static/image/myDown.png',
							text:'我的',
							selectedPage:'../../static/image/myOn.png'
						}
					]
				},
				// indexCurrent:0
			}
		},
		computed:{
			current(){
				return typeof this.count=='string'?Number(this.count):this.count
			},
		},
		methods:{
			tabChange(idx,url){
				uni.switchTab({
					url
				})
			},
			imgStyle(index){
				if(index===1){
					return {
						width:'6vw',
						height:'5vh'
					}
				}else if(index===3){
					return {
						width:'8vw',
						height:'5vh'
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabBar{
		._list{
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 11.2vh;
			background: rgba(27, 44, 136, .9);//#1B2C7E
			width: 92vw;
			margin: 0 auto;
			border-top-left-radius: 3vw;
			border-top-right-radius: 3vw;
			._item{
				display: flex;justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #fff;
				image{
					width: 10vw;
					height: 5vh;
				}
				text{
					margin-top: 1vh;
				}
			}
		}
	}
</style>