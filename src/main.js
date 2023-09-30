import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import "primevue/resources/themes/md-light-indigo/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import Image from "primevue/image";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import Password from "primevue/password";
import Sidebar from "primevue/sidebar";

createApp(App)
    .use(router)
    .use(PrimeVue, {ripple : true})
    .use(ToastService)
    .component('pv-sidebar', Sidebar)
    .component('pv-toolbar', Toolbar)
    .component('pv-button', Button)
    .component('pv-image', Image)
    .component('pv-card', Card)
    .component('pv-input-text', InputText)
    .component('pv-calendar', Calendar)
    .component('pv-password', Password)
    .component('pv-dropdown', Dropdown)
    .mount('#app')