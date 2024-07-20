import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "./tools/i18n";

import "./style.css";
import "jam-icons/css/jam.min.css";
import "primeicons/primeicons.css";

const pinia = createPinia();
const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(pinia);
app.mount("#app");
