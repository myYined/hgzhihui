<template>
	<view class="kuan-ip-input">
		<view class="inputBox">
			<input class="input" type="number" :focus="focus[0]" v-model="a" @confirm="next(1)" confirm-hold maxlength="3"/>
			<input class="input" type="number" :focus="focus[1]" v-model="b" @confirm="next(2)" confirm-hold maxlength="3"/>
			<input class="input" type="number" :focus="focus[2]" v-model="c" @confirm="next(3)" confirm-hold maxlength="3"/>
			<input class="input" type="number" :focus="focus[3]" v-model="d" maxlength="3"/>
		</view>
		<view class="pointBox">
			<input class="point" type="text" value="." disabled/>
			<input class="point" type="text" value="." disabled/>
			<input class="point" type="text" value="." disabled/>
			<input class="point" type="text" value="" disabled/>
		</view>
	</view>
</template>

<script>
	let init = false
	
	export default {
		props:{
			value:String
		},
		data() {
			return {
				version:"1.0.0",
				a:"",
				b:"",
				c:"",
				d:"",
				focus:[false,false,false,false]
			};
		},
		watch:{
			value:function(e){
				this.ip = this.value
			},
			a:function(e){
				this.autoInput(e,1)
			},
			b:function(e){
				this.autoInput(e,2)
			},
			c:function(e){
				this.autoInput(e,3)
			}
		},
		created(){
			this.ip = this.value
		},
		methods:{
			next(n){
				let arr = [false,false,false,false]
				arr[n] = true
				this.focus = arr
			},
			autoInput(e,n){
				if(e.length===3){
					this.next(n)
				}
			}
		},
		computed:{
			ip:{
				get:function(){
					const {a,b,c,d} = this
					const ip = `${a}.${b}.${c}.${d}`
					if(init){
						this.$emit('input',ip);
					}
					init = true
					return ip
				},
				set:function(newValue){
					let arr = newValue.split(".")
					if(arr.length === 4){
						const [a,b,c,d] = arr
						Object.assign(this,{a,b,c,d})
					}else{
						if(newValue){
							throw Error("IP格式异常,赋值失败")
						} 
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.row-center{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.kuan-ip-input{
		width: 100%;
		height: 100%;
		border: 1px solid #007AFF;
		border-radius: 6px;
		display: flex;
		flex-direction: row;
		position: relative;
		.inputBox{
			width: 100%;
			height: 100%;
			z-index: 10;
			@extend .row-center;
			input{
				text-align: center;
			}
		}
		.pointBox{
			z-index: 9;
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			@extend .row-center;
			input{
				flex: 1;
				text-align: right;
			}
		}
	}
</style>
