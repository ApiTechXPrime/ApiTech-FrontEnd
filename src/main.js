

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
const app = createApp(App)
app.use(router)
app.use(PrimeVue,{ripple:true})
app.mount('#app')

app.component('pv-button', Button)
app.component('pv-card', Card)
app.component('pv-input-text', InputText)
