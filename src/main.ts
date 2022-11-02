import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "@/assets/lib/lib-flexiable.js"
import App from './App.vue'
import router from './router'
import Vant from 'vant'

import './assets/css/main.css'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vant)

app.mount('#app')
