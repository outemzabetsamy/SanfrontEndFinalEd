import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueHtml2Canvas from 'vue-html2canvas';
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)
Vue.use(VueHtml2Canvas);
export const bus =new Vue();
Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
