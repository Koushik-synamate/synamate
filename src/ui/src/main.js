import { createApp } from "vue";
import App from "./App.vue";
import './index.css'
import router from './router'
import { Synamate } from "./synamate";
const syna = new Synamate();
window.ghl = syna;
createApp(App).use(router).mount("#app");
