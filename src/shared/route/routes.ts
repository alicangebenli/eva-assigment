import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from "@/pages/Dashboard/index.vue"
import Login from "@/pages/Login/index.vue"
const routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/', component: Login },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
})