import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import router from './router/index'
import axios from 'axios'

const app = createApp(App)
app.use(Antd)        // 为Ant Design Vue调用app.use()
app.use(router)      // 为Vue Router调用app.use()
app.provide("$axios", axios)
app.mount('#app')    // 挂载app
app.config.globalProperties.$axios = axios //配置axios的全局引用