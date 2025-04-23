import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import "./style.css";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
// Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

import Vue3Marquee from "vue3-marquee";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
app.use(Antd);
app.use(Vue3Marquee);

// Khởi tạo AOS
AOS.init({
  duration: 800, // thời gian hiệu ứng (ms)
  easing: "ease-out", // hiệu ứng easing
  once: false, // chỉ chạy animation một lần
});

app.mount("#app");
