import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import {postKeyValueRequest, postRequest, putRequest, getRequest, deleteRequest, allRequest} from './utils/api'
import 'element-ui/lib/theme-chalk/index.css';

//使用Vue插件方式，通过把它们添加到 Vue.prototype 上实现；通过 this. 的方式就可以调用这些引用的方法；
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.allRequest = allRequest;

Vue.config.productionTip = false;

Vue.use(ElementUI,{size:'small'});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
