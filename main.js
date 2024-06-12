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
<<<<<<< HEAD
import tab from "@/components/custom-tab-bar/index.vue";
Vue.component('my-header',Header)
Vue.component('tab',tab)
=======
Vue.component('my-header',Header)
>>>>>>> 1c4ff1f79fae2a8429b11e5ae78a9fa14db2439c

const app = new Vue({
  ...App,
});
app.$mount();
