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
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import ProgressBar from "primevue/progressbar";
import Sidebar from "primevue/sidebar";
import InputNumber from "primevue/inputnumber";
import Chart from "primevue/chart";

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
    .component('pv-input-number', InputNumber)
    .component('pv-chart', Chart)
    .component('pv-column',Column)
    .component('pv-data-table',DataTable)
    .component('pv-tag',Tag)
    .component('pv-dialog', Dialog)
    .component('pv-textarea', Textarea)
    .component('pv-progressbar',ProgressBar)
    .mount('#app')