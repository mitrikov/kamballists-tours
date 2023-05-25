import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import UIcomponents from '@/components/ui/'

import PrimeVue from 'primevue/config'
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

UIcomponents.forEach(component => {
    app.component(component.name, component)
})

app.mount('#app')
