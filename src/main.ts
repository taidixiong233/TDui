import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Store from '@/store/'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import VueCookies from 'vue-cookies'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(ElementPlus).use(Store).use(VueAxios,Axios).use(VueCookies).mount('#app')
