import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import { Amplify } from 'aws-amplify'
import aws_exports from './aws-exports'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Amplify.configure(aws_exports)

Vue.config.productionTip = false

new Vue({
  icons: {
    iconfont: 'md',
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
