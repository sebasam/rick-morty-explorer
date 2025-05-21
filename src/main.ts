import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Toast, { POSITION } from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
}

app.use(Toast, options)
app.use(createPinia())
app.use(router)

app.mount('#app')
