import Vue from 'vue'
import FuiDev from '@/components/FuiDev'

Vue.config.productionTip = false

new Vue({
  render: h => h(FuiDev)
}).$mount('#app')
