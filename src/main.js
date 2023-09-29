import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ToastService from "primevue/toastservice";
import PrimeVue from "primevue/config";
// PrimeVue Material Design Theme
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
// PrimeVue Components
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Menu from "primevue/menu";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import Image from "primevue/image";
import Card from "primevue/card";
createApp(App)
    .use(router)
    .use(PrimeVue, { ripple: true })
    .use(ToastService)
    .component('pv-card',Card)
    .component('pv-toolbar', Toolbar)
    .component('pv-input-text', InputText)
    .component('pv-textarea', Textarea)
    .component('pv-button', Button)
    .component('pv-image', Image)
    .mount('#app')
