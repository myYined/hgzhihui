import Vue from 'vue';
import App from './App';
import mqtt from '@/common/mqttTools.js'
import * as Api from '@/common/api.js'

Vue.config.productionTip = false;
Vue.prototype.$mqtt = mqtt
Vue.prototype.$api = Api;
App.mpType = 'app';

// 全局注册
import Header from '@/components/Heaher_view/index.vue';
import tab from "@/components/custom-tab-bar/index.vue";
Vue.component('my-header',Header)
Vue.component('tab',tab)

const app = new Vue({
  ...App,
});
app.$mount();