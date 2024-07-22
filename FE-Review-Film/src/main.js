import "./assets/main.css";
import "vue3-toastify/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { Icon } from "@iconify/vue";

import App from "./App.vue";
import router from "./router.js";
import i18n from "./tools/i18n";

const app = createApp(App);

app.component("Icon", Icon);

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount("#app");
