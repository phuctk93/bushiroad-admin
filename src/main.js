import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    name: '',
    pass: '',
    token: '',
    host: 'https://anino.xyz'
  }
}).$mount('#app')
