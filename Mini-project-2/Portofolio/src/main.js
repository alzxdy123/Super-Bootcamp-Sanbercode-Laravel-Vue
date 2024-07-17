import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./style.css";
import "jam-icons/css/jam.min.css";
import "primeicons/primeicons.css";

createApp(App).use(router).mount("#app");
