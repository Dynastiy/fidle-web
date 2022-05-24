import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Axios from 'axios'

import '@/assets/css/main.css'
import '@/assets/css/media-query.css'

import instance from '@/plugins/axios.js'

import "toastify-js/src/toastify.css"
import toastify from 'toastify-js'

Vue.prototype.$toastify = toastify

Vue.prototype.$axios = instance

Vue.config.ignoredElements = [/^ion-/]

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')