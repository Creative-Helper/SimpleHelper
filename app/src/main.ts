// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { i18n } from '@/locale'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import store from './store/index.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
