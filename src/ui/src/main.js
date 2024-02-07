import { createApp } from "vue";
// import Vue from 'vue';
// import { createWebHistory, createRouter } from 'vue-router'
import App from "./App.vue";
// import SuccessPageVue from "./components/SuccessPage.vue";
import { GHL } from "./ghl";
import './index.css'
import router from './router'
// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: '/', component: App },
//         { path: '/success', component: SuccessPageVue },
//     ]
// });
const ghl = new GHL();
window.ghl = ghl;
createApp(App).use(router).mount("#app");
