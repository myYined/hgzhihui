# uni-app IP输入框
### 作者：小宽

1. 支持微信小程序，其它平台的小程序没有测试，理论上支持
2. 输入3位自动跳转，键盘确认自动跳转


## 开始使用


### 使用方法
在 `script` 中引入组件
``` javascript
import kuanIpInput from '@/components/kuan-ip-input/kuan-ip-input.vue'
export default {
    components: {kuanIpInput}
}
```
在 `template` 中使用
``` javascript
<kuan-ip-input v-model="ip"></kuan-ip-input>
```
### 其他说明
1.	使用时在css中通过kuan-ip-input标签可以控制输入框宽高，颜色和字体大小
2.	v-model绑定的值在编辑时是实时自动绑定的，IP赋值校验时判断的是中间三个点，如果没有或多于三个点就会赋值不成功
3.	如果需要其它配置可以手动更改组件内容（边框设置，检验方案等）
4.	如果有问题可以邮件联系1913660949@qq.com, 看到有空会处理。如邮件联系，请尽量准确详细描述你所遇到的问题。
