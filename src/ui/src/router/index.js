import { createWebHistory, createRouter } from 'vue-router'
// import App from "./App.vue";
import SuccessPageVue from '@/components/SuccessPage.vue';
import HelloWorldVue from '@/components/HelloWorld.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HelloWorldVue },
        { path: '/success', component: SuccessPageVue },
    ]
});


export default router;