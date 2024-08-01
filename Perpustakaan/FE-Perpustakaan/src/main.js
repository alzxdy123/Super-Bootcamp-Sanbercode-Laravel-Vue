import "./assets/scss/init.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "jam-icons/css/jam.min.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createBootstrap } from "bootstrap-vue-next";
import Vselect from "vue-select";
import Notifications from "@kyvg/vue3-notification";

import App from "./App.vue";
import router from "./router.js";
import i18n from "./tools/i18n";

const app = createApp(App);

app.use(createPinia());
app.use(createBootstrap());
app.use(router);
app.use(i18n);
app.use(Notifications);
app.component("v-select", Vselect);

app.mount("#app");
