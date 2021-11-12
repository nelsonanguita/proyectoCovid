import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false

import VueEllipseProgress from 'vue-ellipse-progress';
Vue.use(VueEllipseProgress);

import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue, {
    highcharts: Highcharts
})


import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

new Vue({
 
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
