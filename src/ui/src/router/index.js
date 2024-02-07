import { createWebHistory, createRouter } from 'vue-router'
// import App from "./App.vue";
import SuccessPageVue from '@/components/SuccessPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/success', component: SuccessPageVue },
    ]
});


export default router;