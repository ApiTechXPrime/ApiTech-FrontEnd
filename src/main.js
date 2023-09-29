

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from "primevue/config";
import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/md-light-indigo/theme.css'
import Card from "primevue/card";
import Button from "primevue/button";

const app = createApp(App)

app.use(router)
app.use(PrimeVue,{ripple:true})
app.mount('#app')
app.component('pv-card',Card)
app.component('pv-button',Button)

