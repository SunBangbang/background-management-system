import Vue from 'vue'

import Cookies from 'js-cookie'

import { sha256 } from 'js-sha256'

Vue.prototype.$sha256 = sha256

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'
import axios from 'axios'
Vue.prototype.axios = axios
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import './icons'
import './permission'
import './utils/error-log'

import * as filters from './filters'

import api from './api/index.js'
import http from './api/httpApi.js'
Vue.prototype.$api = api
Vue.prototype.$Cookies = Cookies
Vue.prototype.$http = http

Vue.use(Element, {
    size: Cookies.get('size') || 'medium'

})

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})