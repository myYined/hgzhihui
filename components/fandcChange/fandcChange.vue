<template>
	<view>
		<transition name="fade">
			<view class="pop" v-if="changeView">
				<view class="pop-box" @click="fun(0)">
					楼层
				</view>
				<view class="pop-box" @click="fun(1)">
					班级
				</view>
			</view>
		</transition>
		<view @click="changeView=!changeView">
			{{valueData==0?'楼层':'班级'}} {{changeView?'▼':'▲'}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "fandcChange",
		data() {
			return {
				valueData: 0,
				changeView: false
			};
		},
		// directives: {
		// 	clickoutside: { // 初始化指令
		// 		bind(el, binding, vnode) {
		// 			function documentHandler(e) {
		// 				// 这里判断点击的元素是否是本身，是本身，则返回
		// 				if (el.contains(e.target)) {
		// 					return false;
		// 				}
		// 				// 判断指令中是否绑定了函数
		// 				if (binding.expression) {
		// 					// 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
		// 					binding.value(e);
		// 				}
		// 			}
		// 			// 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
		// 			el.__vueClickOutside__ = documentHandler;
		// 			document.addEventListener('click', documentHandler);
		// 		},
		// 		update() {},
		// 		unbind(el, binding) { // 解除事件监听
		// 			document.removeEventListener('click', el.__vueClickOutside__);
		// 			delete el.__vueClickOutside__;
		// 		}
		// 	}
		// },
		methods: {
			fun(e) {
				this.valueData = e
				this.$emit("change", e);
				this.changeView = false
			}
		}
	}
</script>

<style lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: 0.4s
	}

	.fade-enter {
		opacity: 0;
		transform: translateY(4.32vw);
	}

	.fade-leave-to

	/* .fade-leave-active, 2.1.8 版本以下 */
		{
		opacity: 0;
		transform: translateY(4.32vw);
	}

	.pop {
		position: absolute;
		bottom: 4.32vw;
		text-align: center;

		&-box {
			padding: 1.46vw 0;
			height: 4.32vw;
			width: 10.31vw;
			background-color: rgba(4, 18, 91, 0.37);
		}
	}
</style>
