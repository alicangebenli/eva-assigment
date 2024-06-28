import {createApp} from 'vue'
import './shared/style/tailwind.css'
import './shared/style/init.css'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import {router} from "./shared/route/routes.ts";
import {store} from "@/store/store.ts";

createApp(App).use(HighchartsVue).use(router).use(store).mount('#app')
